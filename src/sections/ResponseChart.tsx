import React, { useEffect, useRef, useState } from "react";

const data = [
  { time: "5 min",   context: "Ideal",       loss: null, visualPct: 100, color: "#253FF6", shadow: "rgba(37,63,246,0.3)",  tag: "rgba(37,63,246,0.1)",  tagText: "#253FF6"  },
  { time: "30 min",  context: "Aceitável",   loss: 79,   visualPct: 48,  color: "#F59E0B", shadow: "rgba(245,158,11,0.25)", tag: "rgba(245,158,11,0.12)", tagText: "#B45309"  },
  { time: "1 hora",  context: "Crítico",     loss: 95,   visualPct: 20,  color: "#EF4444", shadow: "rgba(239,68,68,0.25)",  tag: "rgba(239,68,68,0.1)",  tagText: "#B91C1C"  },
  { time: "+1 hora", context: "Perda certa", loss: 99,   visualPct: 10,  color: "#991B1B", shadow: "rgba(153,27,27,0.3)",   tag: "rgba(153,27,27,0.1)",  tagText: "#7F1D1D"  },
];

export default function ResponseChart() {
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

  const CHART_H = 280;

  return (
    <section ref={ref} className="w-full bg-white">
      <div className="container-content py-20 md:py-25">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className="font-bold text-2xl md:text-5xl leading-snug mb-3 title-gradient"
            style={{
              WebkitTextFillColor: "transparent",
              opacity: 0,
              animation: visible ? "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 0ms forwards" : "none",
            }}
          >
            Quanto tempo você demora para responder?
          </h2>
          <p
            className="font-light text-sm md:text-base text-brand-navy/50"
            style={{
              opacity: 0,
              animation: visible ? "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 150ms forwards" : "none",
            }}
          >
            Chance relativa de converter um paciente por tempo de resposta
          </p>
        </div>

        {/* Gráfico */}
        <div className="max-w-xl mx-auto">
          {/* Barras — alinhadas pela base */}
          <div className="flex items-end justify-center gap-6" style={{ height: CHART_H }}>
            {data.map(({ visualPct, color, shadow }, i) => {
              const barH = (visualPct / 100) * CHART_H;
              const isMain = i === 0;
              const delay = 350 + i * 130;
              return (
                <div
                  key={i}
                  className="rounded-t-xl relative overflow-hidden flex-shrink-0"
                  style={{
                    width: 100,
                    height: barH,
                    background: isMain ? `linear-gradient(180deg, ${color} 0%, #131B54 100%)` : color,
                    transform: visible ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "bottom",
                    transition: `transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                    boxShadow: `0 8px 28px ${shadow}`,
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-8 rounded-t-xl"
                    style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)" }}
                  />
                </div>
              );
            })}
          </div>

          {/* Labels — abaixo das barras, mesma largura e gap */}
          <div
            className="flex justify-center gap-6 mt-3"
            style={{
              opacity: 0,
              animation: visible ? "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) 900ms forwards" : "none",
            }}
          >
            {data.map(({ time, context, loss, tag, tagText }, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5" style={{ width: 100 }}>
                <span className="font-bold text-sm text-brand-navy text-center">{time}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full text-center" style={{ background: tag, color: tagText }}>
                  {context}
                </span>
                {loss !== null && (
                  <span className="text-xs font-bold text-center" style={{ color: tagText }}>
                    −{loss}% das chances
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center mt-10 text-brand-navy/30">
          Fonte: Harvard Business Review / MIT Lead Response Management Study
        </p>

      </div>
    </section>
  );
}
