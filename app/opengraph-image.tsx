import { ImageResponse } from "next/og"
import { profile } from "@/lib/content"

export const alt = `${profile.name} — ${profile.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
// Rendered once at build time and written out as a PNG, so the static export
// has nothing left to compute at request time.
export const dynamic = "force-static"

/**
 * Social card, generated at build time from the same tokens as the site.
 * Dark ground, one hairline grid, one accent mark — no image assets involved.
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
          backgroundColor: "#0c0c0d",
          backgroundImage:
            "linear-gradient(to right, #1b1b1d 1px, transparent 1px), linear-gradient(to bottom, #1b1b1d 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, backgroundColor: "#e08b4f" }} />
          <div style={{ fontSize: 20, letterSpacing: 3, color: "#74716a", textTransform: "uppercase" }}>
            Harare, Zimbabwe
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, color: "#f2f1ed", letterSpacing: -3, lineHeight: 1.02 }}>Chiurai Campbell</div>
          <div style={{ fontSize: 82, color: "#a5a29a", letterSpacing: -3, lineHeight: 1.02 }}>Shava Mgonie</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ width: "100%", height: 1, backgroundColor: "#232325" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 24, color: "#f2f1ed", letterSpacing: 1 }}>{profile.role}</div>
            <div style={{ fontSize: 20, color: "#74716a", letterSpacing: 2 }}>
              JAVA · SPRING BOOT · PYTHON · DOCKER
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
