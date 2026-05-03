import React, { useEffect, useRef } from "react";

interface Props {
  scrollContainer: React.RefObject<HTMLDivElement>;
}

export default function TruthMorphSection({ scrollContainer }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const panel4aRef = useRef<HTMLDivElement>(null);
  const panel4bRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky  = stickyRef.current;
    const p4a     = panel4aRef.current;
    const p4b     = panel4bRef.current;
    const c       = scrollContainer.current;
    if (!wrapper || !sticky || !p4a || !p4b || !c) return;

    const animateWords = (container: HTMLElement) => {
      container.querySelectorAll<HTMLElement>(".morph-word").forEach((span, i) => {
        span.style.animation = `stagger-in 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s forwards`;
      });
    };

    let anim4a = false;
    let anim4b = false;

    const update = () => {
      const { top, height } = wrapper.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const progress = Math.max(0, Math.min(-top / scrollable, 1));

      // Fundo: #ffffff → #0A0B0B
      const r = Math.round(255 - 245 * progress);
      const g = Math.round(255 - 244 * progress);
      const b = Math.round(255 - 244 * progress);
      sticky.style.backgroundColor = `rgb(${r},${g},${b})`;

      const op4a = Math.max(0, 1 - progress * 2.2);
      p4a.style.opacity   = String(op4a);
      p4a.style.transform = `translateY(${-progress * 50}px)`;

      const op4b = Math.max(0, (progress - 0.3) / 0.6);
      p4b.style.opacity   = String(op4b);
      p4b.style.transform = `translateY(${(1 - op4b) * 50}px)`;

      if (top <= 0 && !anim4a) { anim4a = true; animateWords(p4a); }
      if (op4b >= 0.25 && !anim4b) { anim4b = true; animateWords(p4b); }
      if (op4b < 0.1) anim4b = false;
    };

    c.addEventListener("scroll", update, { passive: true });
    update();
    return () => c.removeEventListener("scroll", update);
  }, [scrollContainer]);

  return (
    <div id="s4" ref={wrapperRef} style={{ height: "300vh", position: "relative" }}>
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          overflow: "hidden",
        }}
      >
        {/* 4a — fundo branco */}
        <div
          ref={panel4aRef}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="container-content text-center">
            <h2
              className="font-bold leading-tight title-gradient"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", WebkitTextFillColor: "transparent" }}
            >
              O problema não é falta de pacientes...
            </h2>
          </div>
        </div>

        {/* 4b — fundo escuro */}
        <div
          ref={panel4bRef}
          className="absolute inset-0 flex items-start justify-center px-6"
          style={{ opacity: 0, paddingTop: "40vh" }}
        >
          <div className="text-center" style={{ maxWidth: "60%" }}>
            <h2
              className="font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 4.2rem)", color: "#fff" }}
            >
              {["é", "o", "que", "acontece"].map((word, i) => (
                <React.Fragment key={i}>
                  <span className="morph-word inline-block">{word}</span>{" "}
                </React.Fragment>
              ))}
              <span style={{ color: "#E8F871" }}>
                {["depois", "que", "eles", "entram", "em", "contato"].map((word, i, arr) => (
                  <React.Fragment key={i}>
                    <span className="morph-word inline-block">{word}</span>
                    {i < arr.length - 1 ? " " : ""}
                  </React.Fragment>
                ))}
              </span>
            </h2>
            <p
              className="font-normal leading-relaxed mx-auto"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "rgba(255,255,255,0.55)", maxWidth: 600 }}
            >
              Mensagens acumulam, respostas atrasam e, no meio disso, pacientes
              desistem sem que você perceba exatamente onde perdeu cada oportunidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
