import { useRef, useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

const chartData = [
  { label: "5 min",    pct: 100 },
  { label: "30 min",   pct: 54  },
  { label: "1 hora",   pct: 22  },
  { label: "+1 hora",  pct: 8   },
];

const barColors = ["#253FF6", "#6B7FF8", "#F59E0B", "#EF4444"];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: "10px 14px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    }}>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 18, fontWeight: 800, color: "#253FF6" }}>
        {payload[0].value}%{" "}
        <span style={{ fontSize: 12, fontWeight: 400, color: "#666" }}>de chance</span>
      </p>
    </div>
  );
}

export default function ResponseChart() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      className="w-full bg-white"
      style={{ minHeight: "100dvh", display: "flex", alignItems: "center" }}
    >
      <div className="container-content py-20 md:py-25 w-full">
        <div
          className="grid items-center gap-16"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >

          {/* Coluna esquerda — gráfico */}
          <div style={reveal(0)}>
            <p style={{
              fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#253FF6", marginBottom: 8,
            }}>
              Chance de conversão (%)
            </p>
            <p style={{ fontSize: 13, color: "#131B54", opacity: 0.4, marginBottom: 28 }}>
              por tempo de resposta ao paciente
            </p>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} barCategoryGap="28%" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#888", fontFamily: "Red Hat Display" }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#888", fontFamily: "Red Hat Display" }}
                  axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={barColors[i]} fillOpacity={1 - i * 0.08} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <p style={{ fontSize: 11, color: "#131B54", opacity: 0.25, marginTop: 16 }}>
              Fonte: Harvard Business Review · MIT Lead Response Management Study
            </p>
          </div>

          {/* Coluna direita — texto */}
          <div>
            <p style={{ ...reveal(0.1), fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#253FF6", marginBottom: 16 }}>
              O que os dados mostram
            </p>

            <h2
              className="font-bold leading-snug title-gradient"
              style={{
                ...reveal(0.2),
                fontSize: "clamp(28px, 3.5vw, 48px)",
                WebkitTextFillColor: "transparent",
                marginBottom: 24,
              }}
            >
              Quanto tempo você demora para responder?
            </h2>

            <p style={{ ...reveal(0.3), fontSize: 16, color: "#131B54", opacity: 0.55, lineHeight: 1.75, marginBottom: 20 }}>
              Um paciente que recebe resposta em até <strong style={{ color: "#131B54", opacity: 1 }}>5 minutos tem 3× mais chance de agendar</strong>. Ignorado por mais de 1 hora, esse paciente já foi para o concorrente.
            </p>

            <p style={{ ...reveal(0.4), fontSize: 16, color: "#131B54", opacity: 0.55, lineHeight: 1.75, marginBottom: 36 }}>
              Não é a qualidade do atendimento que está em jogo — é o tempo de resposta que define quem fica e quem vai embora.
            </p>

            {/* Stat destaque */}
            <div style={{
              ...reveal(0.5),
              display: "flex", alignItems: "flex-start", gap: 20,
              padding: "22px 24px", borderRadius: 12,
              border: "1px solid rgba(37,63,246,0.15)",
              background: "rgba(37,63,246,0.04)",
            }}>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 36, fontWeight: 800, color: "#253FF6", lineHeight: 1 }}>67%</p>
                <p style={{ fontSize: 12, color: "#131B54", opacity: 0.35, marginTop: 4 }}>dos pacientes</p>
              </div>
              <p style={{ fontSize: 15, color: "#131B54", opacity: 0.55, lineHeight: 1.65 }}>
                que não recebem resposta em menos de 1 hora marcam consulta em outra clínica — e raramente voltam.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
