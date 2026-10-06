import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lerProgressoCurso } from "../lib/progresso";

const cursos = [
  {
    id: "basico",
    label: "Básico",
    sub: "Fundamentos de sustentabilidade",
    icone: <img src="/semente-de-mao.png" style={{ width: "40px", filter: "invert(1)" }} />,
    cor: "#16a34a",
    corClara: "#4ade80",
    capitulos: 4,
    descCaps: ["Origem do lixo e Revolução Industrial", "Obsolescência e lixo eletrônico", "Impactos ambientais do lixo", "Consumo consciente e responsabilidade"],
    rota: "/curso-basico",
  },
  {
    id: "medio",
    label: "Médio",
    sub: "Aprofunde seu conhecimento",
    icone: <img src="/plantar.png" style={{ width: "40px", filter: "invert(1)" }} />,
    cor: "#0d9488",
    corClara: "#5eead4",
    capitulos: 5,
    descCaps: ["Mudanças climáticas", "Energia renovável", "Água e recursos naturais", "Consumo consciente", "Cidades sustentáveis"],
    rota: "/curso-medio",
  },
  {
    id: "avancado",
    label: "Avançado",
    sub: "Para quem quer ir além",
    icone: <img src="/arvores.png" style={{ width: "40px", filter: "invert(1)" }} />,
    cor: "#1d4ed8",
    corClara: "#93c5fd",
    capitulos: 10,
    descCaps: [
      "Política ambiental global", "Acordos climáticos internacionais",
      "Economia circular", "Pegada de carbono", "Biodiversidade",
      "Oceanos e ecossistemas", "Tecnologia verde", "ESG nas empresas",
      "Agricultura sustentável", "Ativismo e cidadania ambiental"
    ],
    rota: "/curso-avancado",
  },
  {
    id: "animais",
    label: "Animais em Extinção",
    sub: "Conheça espécies ameaçadas",
    icone: <img src="/patas.png" style={{ width: "40px", filter: "invert(1)" }} />,
    cor: "#b45309",
    corClara: "#fcd34d",
    capitulos: 5,
    descCaps: ["Por que espécies somem?", "Animais do Brasil em risco", "Fauna marinha ameaçada", "Projetos de conservação", "Como você pode ajudar"],
    rota: "/animais-extincao",
  },
  {
    id: "plantas",
    label: "Plantas em Extinção",
    sub: "Conheça a flora ameaçada",
    icone: <img src="/folha.png" style={{ width: "40px", filter: "invert(1)" }} />,
    cor: "#4d7c0f",
    corClara: "#bef264",
    capitulos: 5,
    descCaps: ["Por que as plantas desaparecem?", "Pau-brasil e a exploração histórica", "Orquídeas raras da Mata Atlântica", "Plantas medicinais ameaçadas", "Araucária e o Sul do Brasil"],
    rota: "/plantas-extincao",
  },
];

export default function Learn() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [expandido, setExpandido] = useState(null);
  const [progressos, setProgressos] = useState({});

  useEffect(() => {
    const mapa = {};
    cursos.forEach((c) => { mapa[c.id] = lerProgressoCurso(c.id); });
    setProgressos(mapa);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/araucarias2.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 24px",
      color: "white",
    }}>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1000px" }}>
        <h1 style={{ fontSize: "clamp(36px,7vw,80px)", fontWeight: 800, textAlign: "center", margin: "0 0 12px" }}>
          TerraMetric<span style={{ color: "#4ade80" }}>Learn</span>
        </h1>
        <p style={{ textAlign: "center", fontSize: "18px", color: "rgba(255,255,255,0.75)", marginBottom: "56px" }}>
          Conteúdo educativo sobre sustentabilidade e impacto ambiental.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
          {cursos.map((c, i) => {
            const isHov = hovered === i;
            const isExp = expandido === i;

            const prog = progressos[c.id];
            const pct = prog && prog.totalPerguntas
              ? Math.min(100, Math.round((prog.perguntasRespondidas / prog.totalPerguntas) * 100))
              : 0;
            const concluido = prog?.concluido || pct >= 100;
            const capsPreenchidos = Math.round((pct / 100) * c.capitulos);
            const textoBotao = concluido ? "Revisar" : pct > 0 ? "Continuar" : "Começar";

            return (
              <div key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)",
                  border: isHov ? `2px solid ${c.cor}` : "2px solid rgba(255,255,255,0.15)",
                  borderTop: `4px solid ${c.cor}`,
                  borderRadius: "20px",
                  padding: "26px 20px 20px",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  transform: isHov ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: isHov ? `0 14px 40px ${c.cor}44` : "0 4px 20px rgba(0,0,0,0.4)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: `${c.cor}26`, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {c.icone}
                  </div>
                </div>

                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 800, color: isHov ? c.corClara : "#fff", margin: "0 0 4px", textAlign: "center" }}>{c.label}</h2>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", textAlign: "center", margin: 0 }}>{c.sub}</p>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap" }}>
                  {Array.from({ length: c.capitulos }).map((_, j) => (
                    <div key={j} style={{
                      width: "8px", height: "8px", borderRadius: "50%", background: c.cor,
                      opacity: j < capsPreenchidos ? 1 : 0.25,
                      transition: "opacity 0.4s",
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textAlign: "center", margin: 0 }}>
                  {c.capitulos} capítulos{pct > 0 ? ` · ${concluido ? "concluído" : `${pct}%`}` : ""}
                </p>

                <button
                  onClick={(e) => { e.stopPropagation(); setExpandido(isExp ? null : i); }}
                  style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "12px", borderRadius: "8px", padding: "4px 10px", cursor: "pointer" }}
                >
                  {isExp ? "Fechar" : "Ver capítulos"}
                </button>

                {isExp && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {c.descCaps.map((cap, k) => (
                      <div key={k} style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", padding: "6px 10px", background: "rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                        {k + 1}. {cap}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => navigate(c.rota)}
                  style={{
                    marginTop: "auto",
                    padding: "10px",
                    borderRadius: "12px",
                    border: "none",
                    background: c.cor,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {textoBotao}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}