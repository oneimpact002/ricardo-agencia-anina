import React from "react";
import { useAnim } from "../hooks/useAnim";

const cards = [
  "Atendimento organizado, mesmo com alto volume.",
  "Mais controle sobre o que acontece no atendimento.",
  "Mais organização e menos falhas no atendimento.",
];

export default function SubHero() {
  const ref = useAnim();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="w-full bg-white">
      <div className="container-content py-4 flex items-center justify-between gap-10">

        <p className="anim font-bold shrink-0 title-gradient" style={{ fontSize: 24, lineHeight: "120%", maxWidth: 400, WebkitTextFillColor: "transparent" }}>
          Uma nova forma de pensar o atendimento dentro da sua clínica
        </p>

        <div className="flex gap-6">
          {cards.map((text, i) => (
            <div
              key={i}
              className="anim flex items-center justify-center rounded-[15px] border border-[#DEE2FA]"
              data-delay={String(i + 1)}
              style={{
                width: 240,
                minHeight: 100,
                padding: 20,
                background: "linear-gradient(146deg, rgba(234,237,255,1) 0%, rgba(234,237,255,0.2) 100%)",
              }}
            >
              <p className="font-normal text-center text-brand-blue" style={{ fontSize: 16 }}>{text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
