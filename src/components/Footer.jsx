import { Link } from "react-router-dom";
import { personal } from "../data/resume";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "32px 40px",
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <img src="/logo.svg" alt="Akshay Bhat" style={{ height: 22, width: "auto", opacity: 0.3 }} />

      <div
        style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.06em",
        }}
      >
        © {new Date().getFullYear()} {personal.name} · {personal.location}
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {[
          { label: "Email", href: `mailto:${personal.email}` },
          { label: "LinkedIn", href: personal.linkedin },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              transition: "color 0.2s ease",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
          >
            {link.label}
          </a>
        ))}
        <Link
          to="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 12,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            transition: "color 0.2s ease",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
        >
          Privacy
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer { padding: 32px 24px !important; justify-content: center; text-align: center; }
        }
      `}</style>
    </footer>
  );
}

