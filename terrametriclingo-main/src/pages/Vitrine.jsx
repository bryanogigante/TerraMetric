import { useState } from "react";

const empresas = [
  { nome: "Ambipar", estado: "SP", cidade: "Sao Paulo", descricao: "Gestão ambiental e reciclagem de residuos industriais e urbanos.", contato: "0800 772 0093", site: "https://www.ambipar.com", tag: "Reciclagem" },
  { nome: "Suzano", estado: "SP", cidade: "Sao Paulo", descricao: "Produção de papel e celulose com manejo florestal sustentavel.", contato: "(11) 3503-9000", site: "https://www.suzano.com.br", tag: "Florestal" },
  { nome: "Resiclean", estado: "SP", cidade: "Barueri", descricao: "Coleta seletiva e logistica reversa para empresas e condominios.", contato: "11 94751-1494", site: "https://www.resiclean.com.br/?gad_source=1&gad_campaignid=23691809936&gbraid=0AAAAADt-k6PUPkcihb8OrhjBG8w7CXOBZ&gclid=CjwKCAjwzNTUBhAjEiwA7zcvWmzlxbyR0G2N71QR6YC9eKmEqIJt3Bk2vhP_XaNUWIVqJubaSoxGwhoCeVEQAvD_BwE", tag: "Coleta Seletiva" },
  { nome: "Ciclo Organico", estado: "RJ", cidade: "Rio de Janeiro", descricao: "Compostagem organica e venda de insumos para agricultura urbana.", contato: "(21) 98521-0747", site: "https://cicloorganico.com.br/index/ciclo-organico", tag: "Compostagem" },
  { nome: "Verde Ghaia", estado: "MG", cidade: "Sao Jose dos Campos", descricao: "Consultoria em sustentabilidade e certificações ambientais ISO 14001.", contato: "(12) 3900-1000", site: "https://www.verdeghaia.com.br", tag: "Consultoria" },
  { nome: "Ecoville", estado: "ES", cidade: "Vitoria", descricao: "Loja de produtos sustentaveis, organicos e de baixo impacto ambiental.", contato: "(27) 3315-4567", site: "https://www.ecoville.com.br", tag: "Produtos Eco" },
  { nome: "BioSmart", estado: "RJ", cidade: "Niteroi", descricao: "Energia solar fotovoltaica para residencias e empresas.", contato: "(21) 2718-3344", site: "https://www.biosmart.com.br", tag: "Energia Solar" },
];

const estados = ["Todos", "SP", "RJ", "MG", "ES"];

const tagColors = {
  "Reciclagem":      { bg: "#052e16", border: "#16a34a", text: "#4ade80" },
  "Florestal":       { bg: "#052e16", border: "#15803d", text: "#86efac" },
  "Coleta Seletiva": { bg: "#022c22", border: "#059669", text: "#6ee7b7" },
  "Compostagem":     { bg: "#052e16", border: "#16a34a", text: "#4ade80" },
  "Consultoria":     { bg: "#0f172a", border: "#22c55e", text: "#86efac" },
  "Tecnologia":      { bg: "#0a0a0a", border: "#22c55e", text: "#4ade80" },
  "Produtos Eco":    { bg: "#052e16", border: "#15803d", text: "#86efac" },
  "Energia Solar":   { bg: "#022c22", border: "#22c55e", text: "#6ee7b7" },
};

export default function Vitrine() {
  const [estadoAtivo, setEstadoAtivo] = useState("Todos");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filtradas = estadoAtivo === "Todos"
    ? empresas
    : empresas.filter((e) => e.estado === estadoAtivo);

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Segoe UI', Arial, sans-serif", padding: "40px 32px" }}>

      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: "#fff" }}>
          Vitrine <span style={{ color: "#22c55e" }}>Sustentavel</span>
        </h1>
        <p style={{ color: "#ffffff", fontSize: 15, margin: 0 }}>
          Empresas e lojas que fazem a diferença para o meio ambiente - Região Sudeste
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
        {estados.map((uf) => (
          <button key={uf} onClick={() => setEstadoAtivo(uf)} style={{ padding: "8px 20px", borderRadius: 999, border: estadoAtivo === uf ? "1px solid #22c55e" : "1px solid #1a3d20", background: estadoAtivo === uf ? "#16a34a" : "#0a0a0a", color: estadoAtivo === uf ? "#fff" : "#4ade80", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>
            {uf}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
        {filtradas.map((empresa, i) => {
          const tag = tagColors[empresa.tag] || tagColors["Reciclagem"];
          const hovered = hoveredIndex === i;
          return (
            <div key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
              style={{ background: "#0a0a0a", border: hovered ? "1px solid #15803d" : "1px solid #1a3d20", borderRadius: 16, padding: 24, cursor: "default", transition: "all 0.25s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}>

              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: tag.bg, border: `1px solid ${tag.border}`, color: tag.text, marginBottom: 14, letterSpacing: "0.05em" }}>
                {empresa.tag}
              </span>

              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{empresa.nome}</h2>

              <p style={{ fontSize: 13, color: "#16a34a", marginBottom: 12, fontWeight: 600 }}>
                {empresa.cidade} - {empresa.estado}
              </p>

              <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 20 }}>{empresa.descricao}</p>

              <div style={{ borderTop: "1px solid #1a3d20", marginBottom: 16 }} />

              <div style={{ fontSize: 13, color: "#4ade80", marginBottom: 8 }}>{empresa.contato}</div>

              <a href={empresa.site} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-block", fontSize: 13, color: "#000", background: "#22c55e", padding: "6px 16px", borderRadius: 8, fontWeight: 700, textDecoration: "none", marginTop: 4 }}>
                Visitar site
              </a>
            </div>
          );
        })}
      </div>

      {filtradas.length === 0 && (
        <p style={{ color: "#4ade80", textAlign: "center", marginTop: 60, fontSize: 16 }}>
          Nenhuma empresa encontrada para este estado ainda.
        </p>
      )}
    </div>
  );
}
