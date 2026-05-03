import React, { useEffect, useRef, useState } from "react";

export default function Section6() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      id="s6"
      ref={ref}
      style={{
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#05071B",
      }}
    >
      <div className="text-center px-6" style={{ maxWidth: 680 }}>
        <p
          className="font-bold uppercase tracking-widest mb-6"
          style={{ ...reveal(0.1), fontSize: 13, color: "#E8F871" }}
        >
          Mas não se preocupe
        </p>
        <h2
          className="font-bold leading-snug"
          style={{ ...reveal(0.3), fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#fff" }}
        >
          Existe um método para parar de perder pacientes no meio do atendimento
        </h2>
      </div>
    </section>
  );
}
