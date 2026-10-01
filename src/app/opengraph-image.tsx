import { ImageResponse } from "next/og";

/**
 * OpenGraph card, rendered to a static PNG at build time.
 * `export const size`/`contentType` are required by next/og; `alt` feeds
 * the accessibility text that Next injects into the emitted <meta>.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Allan Nuwamanya — Full-Stack Engineer, AI Speech Systems, Distributed Architectures";

// Required alongside `output: "export"`: metadata routes must declare that
// they are static or Next refuses to prerender them.
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent rule */}
        <div style={{ display: "flex", width: 96, height: 8, background: "#2fbd7e" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              color: "#f2efe9",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Allan Nuwamanya
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#8a8880",
              marginTop: 20,
            }}
          >
            Full-Stack Engineer · AI Speech Systems
          </div>
          <div style={{ display: "flex", fontSize: 36, color: "#8a8880" }}>
            Distributed Architectures
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2a2a2a",
            paddingTop: 28,
            fontSize: 26,
            color: "#6f6d66",
          }}
        >
          <span>allannuwamanya.dev</span>
          <span>Kampala, Uganda</span>
        </div>
      </div>
    ),
    size
  );
}