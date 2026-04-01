import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const handleHover = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "scale(2.5)";
        ringRef.current.style.borderColor = "rgba(255,255,255,0.5)";
      }
    };

    const handleLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = "scale(1)";
        ringRef.current.style.borderColor = "rgba(255,255,255,0.2)";
      }
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        style={{
          position: "fixed",
          left: cursorXSpring,
          top: cursorYSpring,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "white",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
        }}
      />
      <motion.div
        ref={ringRef}
        style={{
          position: "fixed",
          left: cursorXSpring,
          top: cursorYSpring,
          width: 8,
          height: 8,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-8px, -8px)",
          transition: "transform 0.3s var(--ease-out), border-color 0.3s ease",
        }}
      />
    </>
  );
}
