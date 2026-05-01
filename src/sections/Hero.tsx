import React from "react";

const words = [
  { w: "mas",         hi: false },
  { w: "você",        hi: false },
  { w: "continua",    hi: false },
  { w: "perdendo",    hi: true  },
  { w: "eles",        hi: true  },
  { w: "no",          hi: true  },
  { w: "meio",        hi: true  },
  { w: "do",          hi: true  },
  { w: "atendimento", hi: true  },
];

const bubbles = [
  { src: "/bubble-4.png", style: { top: "20%",  left: "-8%"  }, delay: "0s",    dur: "3.8s" },
  { src: "/bubble-3.png", style: { top: "12%", right: "-6%" }, delay: "0.4s",  dur: "4.2s" },
  { src: "/bubble-2.png", style: { top: "55%", left: "-10%" }, delay: "0.8s",  dur: "3.5s" },
  { src: "/bubble-1.png", style: { top: "65%", right: "-8%" }, delay: "1.2s",  dur: "4.5s" },
];

export default function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden" style={{ height: 700 }}>

      {/* Fundo SVG */}
      <svg
        className="absolute"
        style={{ top: 18, left: 18, bottom: 0, height: "calc(100% - 36px)", width: "calc(100% - 36px)" }}
        viewBox="0 0 1850 855"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hg" cx="0.67" cy="0.39" r="1.2" gradientUnits="objectBoundingBox">
            <stop offset="0"     stopColor="#253FF6" />
            <stop offset="0.385" stopColor="#1C2EA9" />
            <stop offset="1"     stopColor="#0C0C0C" />
          </radialGradient>
          <pattern id="hs" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          </pattern>
          <mask id="hm">
            <path d="M 15,0 H 1835 Q 1850,0 1850,15 L 1844.97,797.431 Q 1844.87,812.431 1829.87,812.431 H 820.283 L 754.578,855 H 15 Q 0,855 0,840 V 15 Q 0,0 15,0 Z" fill="white" />
          </mask>
        </defs>
        <path d="M 15,0 H 1835 Q 1850,0 1850,15 L 1844.97,797.431 Q 1844.87,812.431 1829.87,812.431 H 820.283 L 754.578,855 H 15 Q 0,855 0,840 V 15 Q 0,0 15,0 Z" fill="url(#hg)" />
        <rect width="1850" height="855" fill="url(#hs)" mask="url(#hm)" />
      </svg>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="container-content">
          <div className="flex items-center justify-between h-14 px-5 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <a href="#"><img src="/logo-anina-azul.png" alt="Anina" className="h-7 w-auto" /></a>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-dark/60">
              <a href="#"        className="hover:text-brand-dark transition-colors">Início</a>
              <a href="#sobre"   className="hover:text-brand-dark transition-colors">Sobre</a>
              <a href="#metodo"  className="hover:text-brand-dark transition-colors">Método</a>
              <a href="#contato" className="hover:text-brand-dark transition-colors">Contato</a>
            </nav>
            <a href="#contato" className="bg-brand-dark text-white text-sm font-medium px-5 py-2 rounded-[5px] hover:bg-black transition-colors">
              Entre em contato
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo — dois colunas */}
      <div className="relative z-10 container-content flex items-center gap-8" style={{ paddingTop: 120, paddingBottom: 80 }}>

        {/* Esquerda — texto */}
        <div className="flex-1 min-w-0">
          <div
            className="inline-flex items-center rounded-full border border-[#767676] bg-[rgba(58,58,58,0.46)] stagger-fade"
            style={{ padding: "10px 20px", marginBottom: 24, animationDelay: "0s" }}
          >
            <span className="text-white font-normal uppercase tracking-[0.12em]" style={{ fontSize: 10 }}>
              Automações inteligentes para clínicas e consultórios
            </span>
          </div>

          <p className="stagger-fade text-white font-normal leading-snug" style={{ fontSize: 20, marginBottom: 6, animationDelay: "0.1s" }}>
            Seu WhatsApp recebe pacientes todos os dias...
          </p>

          <p className="font-bold text-white" style={{ fontSize: 36, lineHeight: "110%", marginBottom: 16, maxWidth: 500  }}>
            {words.map(({ w, hi }, i) => (
              <React.Fragment key={i}>
                <span className="inline-block stagger-word" style={{ animationDelay: `${0.55 + i * 0.048}s`, color: hi ? "#E8F871" : "white" }}>
                  {w}
                </span>
                {i < words.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </p>

          <p className="stagger-fade text-white leading-relaxed" style={{ fontSize: 17, fontWeight: 400, animationDelay: "1.1s", marginBottom: 28, maxWidth: 480 }}>
            Demora na resposta, falta de acompanhamento e um processo desorganizado fazem você perder pacientes todos os dias.
          </p>

          <div className="stagger-fade" style={{ animationDelay: "1.4s" }}>
            <a
              href="#contato"
              className="inline-flex items-center justify-center font-normal text-black hover:opacity-90 rounded-[5px] transition-opacity"
              style={{ fontSize: 17, padding: "16px 28px", background: "#E8F871", minWidth: 340 }}
            >
              Quero parar de perder pacientes
            </a>
          </div>
        </div>

        {/* Direita — celular + balões */}
        <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: 520, height: 535 }}>
          <img
            src="/hero-phone.webp"
            alt="Automação de atendimento"
            className="relative z-10 h-full w-auto object-contain drop-shadow-2xl"
          />
          {bubbles.map(({ src, style, delay, dur }, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="absolute z-20 w-56"
              style={{
                ...style,
                animation: `bubble-float ${dur} ease-in-out ${delay} infinite`,
                filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.25))",
              }}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
