/**
 * FAO-56 soil water balance — a faithful browser implementation of the engine
 * IrrigaIQ runs server-side (`agronomy/WaterBalanceEngine`, `fao56-1`).
 *
 * Every table and formula below is taken from the project's own model notes
 * (IrrigaIQ-Backend/docs/irrigation-and-maintenance-models.md), which in turn
 * cite FAO-56 tables 11, 12, 19 and 22 and FAO-33 for Ky. This runs a single
 * day rather than a season from planting, and takes the weather as given
 * instead of from Open-Meteo — so it is the same method on fewer inputs, not a
 * second, invented model.
 *
 * Pure functions, no dependencies.
 */

export type CropKey = "maize" | "tomato" | "wheat" | "potato" | "soybean" | "tobacco"

export type Crop = {
  key: CropKey
  label: string
  /** Kc through initial, mid and end of season (FAO-56 Table 12). */
  kc: { ini: number; mid: number; end: number }
  /** Stage lengths in days: initial, development, mid-season, late season. */
  stages: { ini: number; dev: number; mid: number; late: number }
  /** Rooting depth in metres, minimum to maximum. */
  zr: { min: number; max: number }
  /** Soil-water depletion fraction for no stress (FAO-56 Table 22). */
  p: number
}

export const CROPS: readonly Crop[] = [
  { key: "maize", label: "Maize", kc: { ini: 0.3, mid: 1.2, end: 0.35 }, stages: { ini: 20, dev: 35, mid: 40, late: 30 }, zr: { min: 0.3, max: 1.0 }, p: 0.55 },
  { key: "tomato", label: "Tomato", kc: { ini: 0.6, mid: 1.15, end: 0.7 }, stages: { ini: 30, dev: 40, mid: 40, late: 25 }, zr: { min: 0.25, max: 0.8 }, p: 0.4 },
  { key: "wheat", label: "Wheat", kc: { ini: 0.3, mid: 1.15, end: 0.25 }, stages: { ini: 15, dev: 30, mid: 65, late: 40 }, zr: { min: 0.3, max: 1.0 }, p: 0.55 },
  { key: "potato", label: "Potato", kc: { ini: 0.5, mid: 1.15, end: 0.75 }, stages: { ini: 25, dev: 30, mid: 45, late: 30 }, zr: { min: 0.25, max: 0.5 }, p: 0.35 },
  { key: "soybean", label: "Soybean", kc: { ini: 0.4, mid: 1.15, end: 0.5 }, stages: { ini: 20, dev: 30, mid: 35, late: 25 }, zr: { min: 0.3, max: 0.8 }, p: 0.5 },
  { key: "tobacco", label: "Tobacco", kc: { ini: 0.5, mid: 1.1, end: 0.8 }, stages: { ini: 20, dev: 30, mid: 40, late: 30 }, zr: { min: 0.3, max: 0.8 }, p: 0.5 },
]

/** Available water in mm per metre of soil (FAO-56 Table 19, mid-range). */
export const SOILS = [
  { key: "sand", label: "Sand", aw: 65 },
  { key: "sandy-loam", label: "Sandy loam", aw: 125 },
  { key: "loam", label: "Loam", aw: 155 },
  { key: "clay-loam", label: "Clay loam", aw: 160 },
  { key: "silty-clay", label: "Silty clay", aw: 170 },
  { key: "clay", label: "Clay", aw: 130 },
] as const
export type SoilKey = (typeof SOILS)[number]["key"]

/** The USDA NRCS feel-and-appearance scale the field apps use, as depletion. */
export const SOIL_FEEL = [
  { key: "wet", label: "Wet", depletion: 0.05 },
  { key: "moist", label: "Moist", depletion: 0.2 },
  { key: "slightly-moist", label: "Slightly moist", depletion: 0.4 },
  { key: "dry", label: "Dry", depletion: 0.6 },
  { key: "very-dry", label: "Very dry", depletion: 0.85 },
] as const
export type FeelKey = (typeof SOIL_FEEL)[number]["key"]

/** Application efficiency and the most one pass can deliver, in mm. */
export const METHODS = [
  { key: "drip", label: "Drip", efficiency: 0.9, cap: Number.POSITIVE_INFINITY },
  { key: "sprinkler", label: "Sprinkler", efficiency: 0.75, cap: 35 },
  { key: "pivot", label: "Centre pivot", efficiency: 0.85, cap: 20 },
  { key: "furrow", label: "Furrow", efficiency: 0.6, cap: 80 },
] as const
export type MethodKey = (typeof METHODS)[number]["key"]

export type Decision = "IRRIGATE_NOW" | "IRRIGATE_SOON" | "HOLD_FOR_RAIN" | "ON_TRACK"

export type Inputs = {
  crop: CropKey
  /** Days after planting. */
  day: number
  soil: SoilKey
  feel: FeelKey
  /** Reference evapotranspiration, mm/day. Open-Meteo supplies this for real. */
  et0: number
  /** Expected rainfall over the next 48 hours, mm. */
  rain48: number
  method: MethodKey
  /** Field area in hectares. */
  area: number
}

export type Result = {
  decision: Decision
  stressed: boolean
  stage: string
  kc: number
  zr: number
  /** Total available water in the root zone, mm. */
  taw: number
  /** Readily available water — the refill point, mm. */
  raw: number
  /** Adjusted depletion fraction. */
  p: number
  /** Current root-zone depletion, mm. */
  dr: number
  /** Crop water use today, mm. */
  etc: number
  /** Actual water use after any stress, mm. */
  eta: number
  ks: number
  /** Useful rain from the 48-hour forecast, mm. */
  peff: number
  netDepth: number
  grossDepth: number
  /** Cubic metres for the whole field. */
  volume: number
  /** Days until depletion reaches the refill point, if not already there. */
  daysUntilDue: number | null
  capped: boolean
  reasons: string[]
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Kc and rooting depth for a given day after planting. */
function stageFor(crop: Crop, day: number) {
  const { ini, dev, mid, late } = crop.stages
  const total = ini + dev + mid + late
  const rootingDays = ini + dev
  // Roots grow through the initial and development stages, then hold.
  const zr = crop.zr.min + (crop.zr.max - crop.zr.min) * clamp(day / rootingDays, 0, 1)

  if (day <= ini) return { stage: "Initial", kc: crop.kc.ini, zr }
  if (day <= ini + dev) {
    const t = (day - ini) / dev
    return { stage: "Development", kc: crop.kc.ini + (crop.kc.mid - crop.kc.ini) * t, zr }
  }
  if (day <= ini + dev + mid) return { stage: "Mid-season", kc: crop.kc.mid, zr }
  if (day <= total) {
    const t = (day - ini - dev - mid) / late
    return { stage: "Late season", kc: crop.kc.mid + (crop.kc.end - crop.kc.mid) * t, zr }
  }
  return { stage: "After harvest", kc: 0.2, zr }
}

export function waterBalance(input: Inputs): Result {
  const crop = CROPS.find((c) => c.key === input.crop) ?? CROPS[0]
  const soil = SOILS.find((s) => s.key === input.soil) ?? SOILS[2]
  const feel = SOIL_FEEL.find((f) => f.key === input.feel) ?? SOIL_FEEL[1]
  const method = METHODS.find((m) => m.key === input.method) ?? METHODS[0]

  const { stage, kc, zr } = stageFor(crop, input.day)

  const taw = soil.aw * zr
  const etc = kc * input.et0
  // FAO-56 Table 22 adjustment: p rises when the crop uses less water.
  const p = clamp(crop.p + 0.04 * (5 - etc), 0.1, 0.8)
  const raw = p * taw

  const dr = feel.depletion * taw
  // Ks holds at 1 until the refill point, then falls away linearly.
  const ks = dr <= raw ? 1 : clamp((taw - dr) / ((1 - p) * taw), 0, 1)
  const eta = ks * etc

  // The first 2 mm is intercepted; a fifth of the rest runs off or evaporates.
  const peff = 0.8 * Math.max(0, input.rain48 - 2)

  const stressed = dr > raw + (taw - raw) / 2

  // Whether irrigation is due is judged on the dry projection; rain is then
  // weighed against the deficit separately. Netting rain off first would make
  // HOLD_FOR_RAIN unreachable — the forecast would silently remove the need
  // instead of being the reason to wait, which is not what the engine does.
  const dry1 = clamp(dr + eta, 0, taw)
  const dry2 = clamp(dry1 + eta, 0, taw)

  let decision: Decision
  if (dr >= raw || dry1 >= raw) decision = "IRRIGATE_NOW"
  else if (dry2 >= raw) decision = "IRRIGATE_SOON"
  else decision = "ON_TRACK"

  // Due within two days, but the forecast covers most of the deficit — wait.
  // Never while the crop is already stressed.
  if (decision !== "ON_TRACK" && !stressed && dr > 0 && peff >= 0.6 * dr) {
    decision = "HOLD_FOR_RAIN"
  }

  // How long until the refill point, with the forecast rain counted in.
  let daysUntilDue: number | null = null
  if (decision === "ON_TRACK") {
    let d = clamp(dry2 - peff, 0, taw)
    let days = 2
    while (d < raw && days < 60) {
      d += eta
      days += 1
    }
    daysUntilDue = d >= raw ? days : null
  }

  const uncappedNet = Math.max(0, dr)
  const netDepth = Math.min(uncappedNet, method.cap)
  const capped = uncappedNet > method.cap
  const grossDepth = netDepth / method.efficiency
  const volume = grossDepth * input.area * 10

  const reasons: string[] = []
  reasons.push(`${stage}, day ${input.day} — Kc ${kc.toFixed(2)}, roots ${zr.toFixed(2)} m`)
  reasons.push(`Crop use ${etc.toFixed(1)} mm/day at ET₀ ${input.et0.toFixed(1)}`)
  reasons.push(`Depletion ${dr.toFixed(0)} mm of ${taw.toFixed(0)} mm, refill point ${raw.toFixed(0)} mm`)
  if (peff > 0) reasons.push(`${peff.toFixed(1)} mm of the forecast rain reaches the roots`)
  if (ks < 1) reasons.push(`Past the refill point — water stress is cutting use to ${(ks * 100).toFixed(0)}%`)
  if (capped) reasons.push(`${method.label} cannot apply more than ${method.cap} mm in one pass; refill over several`)

  return {
    decision, stressed, stage, kc, zr, taw, raw, p, dr, etc, eta, ks, peff,
    netDepth, grossDepth, volume, daysUntilDue, capped, reasons,
  }
}

export const DECISION_COPY: Record<Decision, { label: string; detail: string }> = {
  IRRIGATE_NOW: { label: "Irrigate now", detail: "Depletion has reached the refill point." },
  IRRIGATE_SOON: { label: "Irrigate soon", detail: "The projection crosses the refill point within two days." },
  HOLD_FOR_RAIN: { label: "Hold for rain", detail: "Expected rain covers most of the deficit." },
  ON_TRACK: { label: "On track", detail: "No irrigation needed yet." },
}
