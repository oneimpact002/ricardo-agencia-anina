import { useEffect, useRef, useState } from "react";

// appear: delay para entrada (um por um); dur: ciclo da flutuação
const bubbles = [
  { src: "/balao-azul.svg",    top: "10%", left:  "6%",  width: 180, mirror: false, appear: "0.2s",  dur: "4.2s" },  // 1º — topo esq
  { src: "/balao-branco.svg",  top: "74%", right:"10%",  width: 125, mirror: false, appear: "0.9s",  dur: "4.3s" },  // 2º — baixo dir
  { src: "/balao-branco.svg",  top: "40%", left:  "2%",  width: 130, mirror: false, appear: "1.6s",  dur: "3.8s" },  // 3º — meio esq
  { src: "/balao-branco.svg",  top:  "7%", right: "5%",  width: 220, mirror: true,  appear: "2.3s",  dur: "5.1s" },  // 4º — topo dir
  { src: "/balao-azul.svg",    top: "44%", right: "4%",  width: 160, mirror: true,  appear: "3.0s",  dur: "4.7s" },  // 5º — meio dir
  { src: "/balao-amarelo.svg", top: "72%", left: "12%",  width: 155, mirror: true,  appear: "3.7s",  dur: "5.5s" },  // 6º — baixo esq
];

export default function Section5() {
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
      id="s5"
      ref={ref}
      style={{
        position: "relative",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundImage: "url('/fundo-secao5.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {bubbles.map((b, i) => (
        <img
          key={i}
          src={b.src}
          alt=""
          style={{
            position: "absolute",
            top: b.top,
            left: "left" in b ? (b as any).left : undefined,
            right: "right" in b ? (b as any).right : undefined,
            width: b.width,
            transform: b.mirror ? "scaleX(-1)" : undefined,
            opacity: visible ? 1 : 0,
            transition: `opacity 1s ease ${b.appear}`,
            animation: visible ? `bubble-float ${b.dur} ease-in-out ${b.appear} infinite` : "none",
          }}
        />
      ))}

      <div className="text-center px-6" style={{ maxWidth: 780, position: "relative", zIndex: 1 }}>
        <p
          className="font-bold leading-snug"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            color: "#fff",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          O que está travando o crescimento da sua clínica não é o marketing...{" "}
          <span style={{ color: "#E8F871" }}>é o atendimento desorganizado</span>
        </p>
      </div>
    </section>
  );
}
