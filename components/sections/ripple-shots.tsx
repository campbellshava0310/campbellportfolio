import fs from "node:fs"
import path from "node:path"
import Image from "next/image"

/**
 * Ripple app screenshots.
 *
 * Reads `public/ripple/` at build time and renders whatever real screenshots
 * are there, in filename order. No assets, no section — the page never shows a
 * mock, a placeholder or an invented screen. See public/ripple/README.txt.
 */

const DIR = path.join(process.cwd(), "public", "ripple")
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"])

function readShots() {
  try {
    return fs
      .readdirSync(DIR)
      .filter((file) => EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort()
      .map((file) => ({
        src: `/ripple/${file}`,
        // "01-event-discovery.png" -> "Event discovery"
        label: path
          .basename(file, path.extname(file))
          .replace(/^\d+[-_]?/, "")
          .replace(/[-_]+/g, " ")
          .trim(),
      }))
  } catch {
    return []
  }
}

export function RippleShots() {
  const shots = readShots()
  if (shots.length === 0) return null

  return (
    <div className="reveal mt-16">
      <p className="label">Product</p>
      <ul className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:gap-7">
        {shots.map((shot, i) => (
          <li key={shot.src} className="w-[63vw] shrink-0 snap-start sm:w-[248px]">
            {/* Device frame: a bezel, not a glossy mockup. */}
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface p-[5px] shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-[1.45rem] bg-bg-subtle">
                <Image
                  src={shot.src}
                  alt={shot.label ? `Ripple app — ${shot.label}` : "Ripple app screen"}
                  fill
                  sizes="(max-width: 640px) 63vw, 248px"
                  className="object-cover"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
            </div>
            {shot.label ? <p className="mt-3 font-mono text-xs capitalize text-fg-muted">{shot.label}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
