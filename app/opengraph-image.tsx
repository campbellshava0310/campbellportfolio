import { ImageResponse } from "next/og"
import { profile } from "@/lib/content"

export const alt = `${profile.name} — ${profile.roleLong}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
// Rendered once at build time and written out as a PNG, so the static export
// has nothing left to compute at request time.
export const dynamic = "force-static"

/**
 * Social card, generated from the same tokens as the site: white ground, one
 * accent mark, no image assets involved.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, backgroundColor: "#1a56f0" }} />
          <div style={{ fontSize: 20, letterSpacing: 3, color: "#646b7a", textTransform: "uppercase" }}>
            Harare, Zimbabwe
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, color: "#0a0c10", letterSpacing: -3, lineHeight: 1.02 }}>Chiurai Campbell</div>
          <div style={{ fontSize: 84, color: "#3f4654", letterSpacing: -3, lineHeight: 1.02 }}>Shava Mgonie</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: "100%", height: 2, backgroundColor: "#1a56f0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* One text node: Satori requires explicit display on any multi-child div. */}
            <div style={{ fontSize: 25, color: "#0a0c10", letterSpacing: 0.5 }}>
              {`${profile.roleLong} · ${profile.secondRole}`}
            </div>
            <div style={{ fontSize: 19, color: "#646b7a", letterSpacing: 2 }}>JAVA · SPRING BOOT · PYTHON · DOCKER</div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
