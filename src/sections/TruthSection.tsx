import { useEffect, useRef, useState } from "react";

export default function TruthSection() {
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

  return (
    <section
      ref={ref}
      className="w-full bg-white"
      style={{ height: 800 }}
    >
      <div className="container-content py-20 md:py-25">
        <div className="text-center max-w-2xl mx-auto">
        <p
          className="uppercase tracking-[0.14em] font-normal text-brand-navy/50 mb-5"
          style={{
            fontSize: 11,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
          }}
        >
          A verdade que ninguém te conta é essa
        </p>

        <h2
          className="font-bold leading-snug title-gradient"
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            WebkitTextFillColor: "transparent",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
          }}
        >
          O problema não é a falta de pacientes...
        </h2>
        </div>
      </div>
    </section>
  );
}
