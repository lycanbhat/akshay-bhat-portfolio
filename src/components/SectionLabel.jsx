export default function SectionLabel({ number, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        marginBottom: 64,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        {number}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "rgba(255,255,255,0.08)",
          maxWidth: 60,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
