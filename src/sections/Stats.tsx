import React from "react";
import { useAnim } from "../hooks/useAnim";

const stats = [
  { n: "73%",  desc: "dos usuários não voltam a engajar com marcas que demoram a responder no WhatsApp" },
  { n: "61%",  desc: "dos pacientes vão para um concorrente após uma única experiência ruim de atendimento", source: "Zendesk CX Report, 2023" },
  { n: "100x", desc: "mais chance de contato quando a resposta acontece em até 5 minutos", source: "Harvard Business Review / MIT" },
];

export default function Stats() {
  const ref = useAnim();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-white">
      <div className="container-content py-50 md:py-40">

        <h2
          className="anim font-bold text-2xl md:text-4xl leading-snug text-center max-w-[70%] mx-auto mb-16 title-gradient"
          style={{ WebkitTextFillColor: "transparent" }}
        >
          Mais de{" "}
          <span className="hl-sweep anim" style={{ WebkitTextFillColor: "#131B54" }} data-delay="3">
            70% dos pacientes desistem
          </span>{" "}
          quando o atendimento demora para responder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(({ n, desc, source }, i) => (
            <div
              key={i}
              className="anim border border-black/[0.08] rounded-2xl p-8 text-center"
              data-delay={String(i + 1)}
            >
              <p className="font-bold text-5xl md:text-6xl mb-3 text-brand-navy">{n}</p>
              <p className="font-light text-sm leading-relaxed text-brand-navy/60">{desc}</p>
              {source && <p className="text-xs mt-3 text-brand-navy/35">{source}</p>}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
