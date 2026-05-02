import React, { useEffect, useRef, useState } from "react";

const stats = [
  { n: 73,  suffix: "%",  desc: "dos usuários não voltam a engajar com marcas que demoram a responder no WhatsApp" },
  { n: 61,  suffix: "%",  desc: "dos pacientes vão para um concorrente após uma única experiência ruim de atendimento", source: "Zendesk CX Report, 2023" },
  { n: 100, suffix: "x",  desc: "mais chance de contato quando a resposta acontece em até 5 minutos", source: "Harvard Business Review / MIT" },
];

function CountUp({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1200;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(ease * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, delay]);

  return (
    <p className="font-bold text-5xl md:text-6xl mb-3 text-brand-navy">
      {value}{suffix}
    </p>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Título highlight sweep
  useEffect(() => {
    const el = titleRef.current;
    if (!el || !visible) return;
    el.querySelectorAll<HTMLElement>(".hl-sweep").forEach(s => s.classList.add("visible"));
    el.classList.add("visible");
  }, [visible]);

  const cardDelay = [0, 600, 1200]; // ms entre cada card

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="container-content py-[200px] md:py-[200px]">

        <h2
          ref={titleRef}
          className="anim font-bold text-2xl md:text-4xl leading-snug text-center max-w-[70%] mx-auto mb-16 title-gradient"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Mais de{" "}
          <span className="hl-sweep" style={{ WebkitTextFillColor: "#131B54" }}>
            70% dos pacientes desistem
          </span>{" "}
          quando o atendimento demora para responder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(({ n, suffix, desc, source }, i) => (
            <div
              key={i}
              className="rounded-[15px] border border-[#DEE2FA] p-8 text-center"
              style={{
                background: "linear-gradient(146deg, rgba(234,237,255,1) 0%, rgba(234,237,255,0.2) 100%)",
                opacity: 0,
                animation: visible ? `slide-up 0.7s cubic-bezier(0.22,1,0.36,1) ${cardDelay[i]}ms forwards` : "none",
              }}
            >
              {visible && <CountUp target={n} suffix={suffix} delay={cardDelay[i] + 300} />}
              {!visible && <p className="font-bold text-5xl md:text-6xl mb-3 text-brand-navy">0{suffix}</p>}
              <p className="font-light text-sm leading-relaxed text-brand-navy/60">{desc}</p>
              {source && <p className="text-xs mt-3 text-brand-navy/35">{source}</p>}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
