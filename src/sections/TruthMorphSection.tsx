import React, { useEffect, useRef } from "react";

const WORDS_WHITE  = ["é", "o", "que", "acontece"];
const WORDS_YELLOW = ["depois", "que", "eles", "entram", "em", "contato"];

interface Props {
  onRevealReady: (reveal: () => void, hide: () => void) => void;
}

export default function TruthSection({ onRevealReady }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const reveal = () => {
      overlay.style.transition = "opacity 0.7s cubic-bezier(0.22,1,0.36,1)";
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";

      overlay.querySelectorAll<HTMLElement>(".morph-word").forEach((span, i) => {
        span.style.animation = `fade-only 0.5s ease ${0.35 + i * 0.07}s forwards`;
      });

      const sub = overlay.querySelector<HTMLElement>(".morph-sub");
      if (sub) sub.style.opacity = "1";
    };

    const hide = () => {
      overlay.style.transition = "opacity 0.4s ease";
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";

      overlay.querySelectorAll<HTMLElement>(".morph-word").forEach((span) => {
        span.style.animation = "none";
        (span as HTMLElement).style.opacity = "0";
      });

      const sub = overlay.querySelector<HTMLElement>(".morph-sub");
      if (sub) sub.style.opacity = "0";
    };

    onRevealReady(reveal, hide);
  }, [onRevealReady]);

  return (
    <div id="s4" style={{ position: "relative", height: "100dvh", background: "#fff" }}>

      {/* 4a — fundo branco */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <div className="container-content text-center">
          <h2
            className="font-bold leading-tight title-gradient"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", WebkitTextFillColor: "transparent" }}
          >
            O problema não é falta de pacientes...
          </h2>
        </div>
      </div>

      {/* 4b — overlay escuro */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px",
          background: "#05071B",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div className="text-center" style={{ maxWidth: "60%" }}>
          <h2
            className="font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(1.8rem, 4vw, 4.2rem)", color: "#fff" }}
          >
            {WORDS_WHITE.map((word, i) => (
              <React.Fragment key={i}>
                <span className="morph-word inline-block" style={{ opacity: 0 }}>{word}</span>{" "}
              </React.Fragment>
            ))}
            <span style={{ color: "#E8F871" }}>
              {WORDS_YELLOW.map((word, i, arr) => (
                <React.Fragment key={i}>
                  <span className="morph-word inline-block" style={{ opacity: 0 }}>{word}</span>
                  {i < arr.length - 1 ? " " : ""}
                </React.Fragment>
              ))}
            </span>
          </h2>
          <p
            className="morph-sub font-normal leading-relaxed mx-auto"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "rgba(255,255,255,0.55)",
              maxWidth: 600,
              opacity: 0,
              transition: "opacity 0.6s ease 0.9s",
            }}
          >
            Mensagens acumulam, respostas atrasam e, no meio disso, pacientes
            desistem sem que você perceba exatamente onde perdeu cada oportunidade.
          </p>
        </div>
      </div>

    </div>
  );
}
