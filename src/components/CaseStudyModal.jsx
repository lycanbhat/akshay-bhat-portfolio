import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        cursor: "zoom-out",
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: "100%",
          maxHeight: "90vh",
          objectFit: "contain",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          width: 44,
          height: 44,
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 2,
          background: "rgba(0,0,0,0.8)",
          color: "white",
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </motion.div>
  );
}

export default function CaseStudyModal({ study, onClose }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && !lightboxImg && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, lightboxImg]);

  if (!study) return null;

  return (
    <>
      <AnimatePresence>
        {lightboxImg && (
          <ImageLightbox
            key="lb"
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            onClose={() => setLightboxImg(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 2000,
          backdropFilter: "blur(8px)",
        }}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(860px, 100vw)",
          background: "#0a0a0a",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          zIndex: 2001,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Sticky header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "20px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 4,
                fontFamily: "var(--font-display)",
                fontWeight: 500,
              }}
            >
              Case Study
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                color: "white",
                letterSpacing: "-0.01em",
              }}
            >
              {study.name}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 2,
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "56px 40px 80px" }}>
          {/* Hero */}
          <div style={{ marginBottom: 56 }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              {study.platforms?.map((p) => (
                <span
                  key={p}
                  style={{
                    padding: "4px 12px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 2,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                  }}
                >
                  {p}
                </span>
              ))}
              {study.tags?.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "4px 12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "white",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              {study.name}
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                maxWidth: 600,
              }}
            >
              {study.description}
            </p>
          </div>

          {/* Meta grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 56,
            }}
          >
            {study.meta?.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "20px 24px",
                  background: "#0a0a0a",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Sections */}
          {study.sections?.map((section, i) => (
            <div key={i} style={{ marginBottom: 56 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  0{i + 1}
                </span>
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "white",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {section.title}
                </h2>
              </div>

              {section.content && (
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.85,
                    maxWidth: 680,
                    marginBottom: section.bullets ? 20 : 0,
                  }}
                >
                  {section.content}
                </p>
              )}

              {section.bullets && (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {section.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      style={{
                        display: "flex",
                        gap: 16,
                        marginBottom: 14,
                        fontSize: 14,
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.75,
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(255,255,255,0.2)",
                          flexShrink: 0,
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          fontSize: 12,
                          marginTop: 3,
                        }}
                      >
                        {String(bi + 1).padStart(2, "0")}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Screens */}
          {study.screens?.length > 0 && (
            <div style={{ marginBottom: 56 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  0{(study.sections?.length || 0) + 1}
                </span>
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "white",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Design Screens
                </h2>
              </div>
              <div style={study.mobileScreens ? { columnCount: 3, columnGap: 16 } : { display: "flex", flexDirection: "column", gap: 16 }}>
                {study.screens.map((screen, i) => (
                  <div key={i} style={{ breakInside: "avoid", marginBottom: 16 }}>
                    <div
                      onClick={() => setLightboxImg({ src: screen.src, alt: screen.caption })}
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "zoom-in",
                        transition: "border-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    >
                      <img
                        src={screen.src}
                        alt={screen.caption}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.04em",
                        lineHeight: 1.5,
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "rgba(255,255,255,0.15)", flexShrink: 0 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{screen.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outcome */}
          {study.outcome && (
            <div
              style={{
                padding: "32px 36px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                background: "rgba(255,255,255,0.02)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 3,
                  height: "100%",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: 12,
                  fontWeight: 600,
                }}
              >
                Outcome
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {study.outcome}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
