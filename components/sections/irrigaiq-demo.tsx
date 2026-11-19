"use client"

import { useMemo, useState } from "react"
import {
  CROPS,
  DECISION_COPY,
  METHODS,
  SOILS,
  SOIL_FEEL,
  waterBalance,
  type CropKey,
  type FeelKey,
  type Inputs,
  type MethodKey,
  type SoilKey,
} from "@/lib/water-balance"
import { cn } from "@/lib/utils"

/* -------------------------------- controls -------------------------------- */

function ChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly { key: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div role="group" aria-label={label}>
      <p className="label">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.key === value
          return (
            <button
              key={o.key}
              type="button"
              onClick={() => onChange(o.key)}
              aria-pressed={active}
              className={cn(
                "rounded-md border px-3 py-2 text-xs font-medium transition-[background-color,border-color,color,transform] duration-[var(--dur)] active:translate-y-px",
                active
                  ? "border-accent bg-accent text-accent-fg shadow-xs"
                  : "border-line bg-surface text-fg-secondary hover:border-line-strong hover:text-fg",
              )}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  onChange: (v: number) => void
  format?: (v: number) => string
}) {
  const id = `slider-${label.replace(/\s+/g, "-").toLowerCase()}`
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="label">
          {label}
        </label>
        <span className="font-mono text-xs tabular-nums text-fg">
          {format ? format(value) : value}
          {unit ? <span className="text-fg-muted"> {unit}</span> : null}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent outline-hidden"
      />
    </div>
  )
}

/* ------------------------------ soil water bar ----------------------------- */

function SoilBar({ taw, raw, dr, stressed }: { taw: number; raw: number; dr: number; stressed: boolean }) {
  const depletionPct = Math.min(100, (dr / taw) * 100)
  const refillPct = Math.min(100, (raw / taw) * 100)

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="label">Root-zone water</p>
        <p className="font-mono text-xs tabular-nums text-fg-muted">
          {(taw - dr).toFixed(0)} / {taw.toFixed(0)} mm available
        </p>
      </div>

      <div className="relative mt-3 h-12 overflow-hidden rounded-md border border-line bg-bg-subtle">
        {/* Water remaining, filling from the left. */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 transition-[width,background-color] duration-500 ease-out",
            stressed ? "bg-fg-muted" : "bg-accent",
          )}
          style={{ width: `${100 - depletionPct}%` }}
        />
        {/* The refill point: depletion past this is where irrigation is due. */}
        <div
          className="absolute inset-y-0 w-0.5 bg-fg transition-[left] duration-500 ease-out"
          style={{ left: `${100 - refillPct}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Labelled outside the bar — inside, it sat half on the fill and half off. */}
      <div className="relative mt-1.5 h-4">
        <span
          className="absolute top-0 -translate-x-1/2 font-mono text-[0.625rem] tracking-[0.06em] whitespace-nowrap text-fg-muted uppercase transition-[left] duration-500 ease-out"
          style={{ left: `clamp(3rem, ${100 - refillPct}%, calc(100% - 3rem))` }}
        >
          ▲ refill point
        </span>
      </div>

      <p className="mt-1 font-mono text-[0.6875rem] text-fg-muted">
        Depleted {dr.toFixed(0)} mm · refill at {raw.toFixed(0)} mm
      </p>
    </div>
  )
}

/* ---------------------------------- demo ---------------------------------- */

const DECISION_TONE: Record<string, string> = {
  IRRIGATE_NOW: "border-accent bg-accent text-accent-fg",
  IRRIGATE_SOON: "border-accent/40 accent-wash-bg text-accent",
  HOLD_FOR_RAIN: "border-line-strong bg-surface text-fg",
  ON_TRACK: "border-line-strong bg-surface text-fg",
}

export function IrrigaIQDemo() {
  const [input, setInput] = useState<Inputs>({
    crop: "maize",
    day: 55,
    soil: "loam",
    feel: "slightly-moist",
    et0: 5.5,
    rain48: 0,
    method: "drip",
    area: 4,
  })

  const set = <K extends keyof Inputs>(k: K, v: Inputs[K]) => setInput((s) => ({ ...s, [k]: v }))
  const result = useMemo(() => waterBalance(input), [input])
  const copy = DECISION_COPY[result.decision]

  const crop = CROPS.find((c) => c.key === input.crop)!
  const seasonLength = crop.stages.ini + crop.stages.dev + crop.stages.mid + crop.stages.late

  return (
    <div className="mt-20">
      <div className="reveal flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <div>
          <p className="label">Try it</p>
          <h4 className="mt-3 text-h3 font-semibold text-fg">Run the water balance yourself.</h4>
        </div>
        <p className="max-w-[46ch] text-sm text-fg-secondary">
          The same FAO-56 method the platform runs server-side, with the same crop and soil tables —
          on a single day rather than a whole season.
        </p>
      </div>

      <div className="reveal mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-12">
        {/* Inputs */}
        <div className="space-y-7 bg-bg p-6 sm:p-8 lg:col-span-7">
          <ChipGroup
            label="Crop"
            value={input.crop}
            options={CROPS.map((c) => ({ key: c.key as CropKey, label: c.label }))}
            onChange={(v) => set("crop", v)}
          />

          <Slider
            label="Days after planting"
            value={input.day}
            min={1}
            max={seasonLength + 20}
            step={1}
            onChange={(v) => set("day", v)}
            format={(v) => `${v}`}
          />

          <ChipGroup
            label="Soil"
            value={input.soil}
            options={SOILS.map((s) => ({ key: s.key as SoilKey, label: s.label }))}
            onChange={(v) => set("soil", v)}
          />

          <ChipGroup
            label="How the soil feels"
            value={input.feel}
            options={SOIL_FEEL.map((f) => ({ key: f.key as FeelKey, label: f.label }))}
            onChange={(v) => set("feel", v)}
          />

          <div className="grid gap-7 sm:grid-cols-2">
            <Slider
              label="ET₀"
              value={input.et0}
              min={1}
              max={10}
              step={0.1}
              unit="mm/day"
              onChange={(v) => set("et0", v)}
              format={(v) => v.toFixed(1)}
            />
            <Slider
              label="Rain next 48h"
              value={input.rain48}
              min={0}
              max={60}
              step={1}
              unit="mm"
              onChange={(v) => set("rain48", v)}
            />
          </div>

          {/* Full width: four method chips wrap badly in a half column. */}
          <ChipGroup
            label="Method"
            value={input.method}
            options={METHODS.map((m) => ({ key: m.key as MethodKey, label: m.label }))}
            onChange={(v) => set("method", v)}
          />

          <Slider
            label="Field area"
            value={input.area}
            min={0.5}
            max={50}
            step={0.5}
            unit="ha"
            onChange={(v) => set("area", v)}
            format={(v) => v.toFixed(1)}
          />
        </div>

        {/* Output */}
        <div className="bg-bg p-6 sm:p-8 lg:col-span-5">
          <div
            className={cn(
              "rounded-md border px-5 py-4 transition-colors duration-300",
              DECISION_TONE[result.decision],
            )}
            role="status"
            aria-live="polite"
          >
            <p className="font-mono text-[0.625rem] tracking-[0.1em] uppercase opacity-70">Recommendation</p>
            <p className="mt-2 text-h3 font-semibold">
              {copy.label}
              {result.stressed ? <span className="ml-2 text-sm font-medium opacity-80">· stressed</span> : null}
            </p>
            <p className="mt-2 text-sm opacity-85">
              {result.decision === "ON_TRACK" && result.daysUntilDue
                ? `Next irrigation in about ${result.daysUntilDue} days.`
                : copy.detail}
            </p>
          </div>

          <div className="mt-7">
            <SoilBar taw={result.taw} raw={result.raw} dr={result.dr} stressed={result.stressed} />
          </div>

          {result.decision === "IRRIGATE_NOW" || result.decision === "IRRIGATE_SOON" ? (
            <dl className="mt-7 grid grid-cols-3 gap-4">
              {[
                { k: "Net", v: `${result.netDepth.toFixed(0)} mm` },
                { k: "Gross", v: `${result.grossDepth.toFixed(0)} mm` },
                { k: "Volume", v: `${Math.round(result.volume).toLocaleString()} m³` },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="label">{item.k}</dt>
                  <dd className="mt-2 font-mono text-sm font-medium tabular-nums text-fg">{item.v}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-7 border-t border-line pt-5">
            <p className="label">Why</p>
            <ul className="mt-3 space-y-2">
              {result.reasons.map((r) => (
                <li key={r} className="flex gap-2.5 text-xs text-fg-secondary">
                  <span aria-hidden="true" className="mt-[0.5rem] h-px w-2.5 shrink-0 bg-accent/50" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="reveal mt-4 text-xs text-fg-muted">
        Crop coefficients, stage lengths, rooting depths and depletion fractions are FAO-56 tables 11, 12 and 22;
        soil available water is table 19. The platform runs this from planting with live Open-Meteo ET₀ and the
        farm&rsquo;s own soil checks.
      </p>
    </div>
  )
}
