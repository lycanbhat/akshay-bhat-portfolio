import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { liveProducts } from "../data/resume";
import SectionLabel from "./SectionLabel";

function ProductCard({ product, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "32px 36px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 2,
        background: hovered ? "rgba(255,255,255,0.025)" : "transparent",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.3s var(--ease-out)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top-right corner accent */}
      <div style={{ position: "absolute", top: 0, right: 0, width: hovered ? 64 : 0, height: 1, background: "rgba(255,255,255,0.35)", transition: "width 0.35s var(--ease-out)" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 1, height: hovered ? 64 : 0, background: "rgba(255,255,255,0.35)", transition: "height 0.35s var(--ease-out)" }} />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 16 }}>
        <div>
          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#36B37E",
              boxShadow: hovered ? "0 0 8px rgba(54,179,126,0.8)" : "0 0 4px rgba(54,179,126,0.4)",
              transition: "box-shadow 0.3s ease",
              display: "inline-block",
            }} />
            <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(54,179,126,0.8)", fontWeight: 600 }}>Live</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", letterSpacing: "0.06em" }}>·</span>
            <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>{product.org}</span>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 700, color: "white", letterSpacing: "-0.02em", marginBottom: 4 }}>
            {product.name}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>{product.tagline}</div>
        </div>

        {/* Arrow icon */}
        <div style={{
          width: 36, height: 36, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
          transition: "all 0.25s ease",
          background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 11L11 2M11 2H4M11 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 24, flex: 1 }}>
        {product.description}
      </p>

      {/* Footer: stack tags + URL */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {product.stack.map((s) => (
            <span key={s} style={{
              padding: "3px 9px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 2, fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500,
            }}>{s}</span>
          ))}
        </div>
        <span style={{
          fontSize: 11, color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
          fontFamily: "var(--font-display)", letterSpacing: "0.04em", transition: "color 0.25s ease",
          whiteSpace: "nowrap",
        }}>
          {product.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </span>
      </div>
    </motion.a>
  );
}

export default function LiveProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="products"
      ref={ref}
      style={{
        padding: "120px 40px",
        maxWidth: 1400,
        margin: "0 auto",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <SectionLabel number="05" label="Built & Shipped" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginBottom: 16 }}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56, gridColumn: "1 / -1" }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700,
            letterSpacing: "-0.03em", color: "white", lineHeight: 1.05, marginBottom: 16,
          }}>
            Products I've <br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>designed & built</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 520, lineHeight: 1.75 }}>
            Beyond design, I build. These are live, production applications I've taken from concept to code — handling UI/UX design, frontend, and backend end-to-end.
          </p>
        </motion.div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
        {liveProducts.map((product, i) => (
          <ProductCard key={product.name} product={product} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
