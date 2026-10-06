import { useNavigate } from "react-router-dom";

const animais = [
  { nome: "Mico-leão-dourado", status: "Em perigo", descricao: "Primata endêmico da Mata Atlântica, ameaçado pelo desmatamento." },
  { nome: "Onça-pintada", status: "Vulnerável", descricao: "Maior felino das Américas, perde habitat com o avanço do agronegócio." },
  { nome: "Peixe-boi-marinho", status: "Em perigo", descricao: "Mamífero aquático ameaçado pela poluição e colisão com embarcações." },
  { nome: "Arara-azul", status: "Vulnerável", descricao: "Ave símbolo do Brasil, ameaçada pelo tráfico ilegal e perda de habitat." },
];

const plantas = [
  { nome: "Pau-brasil", status: "Em perigo", descricao: "Árvore que deu nome ao país, quase extinta pela exploração histórica." },
  { nome: "Orquídea-fantasma", status: "Crítico", descricao: "Uma das orquídeas mais raras do mundo, encontrada apenas em fragmentos da Mata Atlântica." },
  { nome: "Jaborandi", status: "Vulnerável", descricao: "Planta medicinal nativa do Nordeste, ameaçada pela extração excessiva." },
  { nome: "Araucária", status: "Em perigo", descricao: "Símbolo do Sul do Brasil, sofre com o desmatamento e mudanças climáticas." },
];

const statusColor = {
  "Crítico": { bg: "#2d0000", border: "#dc2626", text: "#f87171" },
  "Em perigo": { bg: "#1c1000", border: "#d97706", text: "#fbbf24" },
  "Vulnerável": { bg: "#052e16", border: "#16a34a", text: "#4ade80" },
};

function CardEspecie({ item }) {
  const cor = statusColor[item.status] || statusColor["Vulnerável"];
  return (
    <div style={{
      background: "#0a0a0a",
      border: "1px solid #1a3d20",
      borderRadius: 14,
      padding: "20px",
    }}>
      <span style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 999,
        background: cor.bg,
        border: `1px solid ${cor.border}`,
        color: cor.text,
        marginBottom: 10,
        letterSpacing: "0.05em",
      }}>
        {item.status}
      </span>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{item.nome}</h3>
      <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>{item.descricao}</p>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#000", color: "#fff", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Hero */}
      <div style={{
        height: "100vh",
        backgroundImage: "url('/araucarias2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}>
        <h1 style={{ fontSize: "120px", margin: 0 }}>TerraMetric</h1>
        <p style={{ fontSize: "27px", marginBottom: 24 }}>Tecnologia que transforma a natureza.</p>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate("/questionario")} style={{
            padding: "10px 25px", borderRadius: "20px", border: "1px solid white",
            background: "transparent", color: "white", cursor: "pointer", fontSize: 15,
          }}>
            Comece aqui
          </button>
          <button onClick={() => navigate("/learn")} style={{
            padding: "10px 25px", borderRadius: "20px", border: "1px solid white",
            background: "#cccccc3a", color: "white", cursor: "pointer", fontSize: 15,
          }}>
            TerraMetric Learn
          </button>
        </div>
      </div>

      {/* Quem Somos */}
      <div style={{ padding: "80px 64px", borderBottom: "1px solid #1a3d20" }}>
        <p style={{ color: "#22c55e", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>QUEM SOMOS</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>
              Uma plataforma feita para quem se importa com o planeta.
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: 16, lineHeight: 1.8 }}>
              A TerraMetric nasceu da necessidade de conectar pessoas, dados e ação ambiental. 
              Somos uma equipe apaixonada por sustentabilidade e tecnologia, acreditando que 
              informação de qualidade é o primeiro passo para mudanças reais.
            </p>
            <p style={{ color: "#a1a1aa", fontSize: 16, lineHeight: 1.8, marginTop: 16 }}>
              Nossa missão é tornar o impacto ambiental visível, compreensível e acionável 
              para qualquer pessoa — seja um estudante, empresa ou cidadão comum.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { num: "20+", label: "Perguntas no quiz" },
              { num: "4", label: "Estados mapeados" },
              { num: "8+", label: "Empresas parceiras" },
              { num: "100%", label: "Foco no planeta" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a3d20", borderRadius: 14, padding: "24px 20px" }}>
                <p style={{ fontSize: 32, fontWeight: 800, color: "#22c55e", margin: 0 }}>{item.num}</p>
                <p style={{ fontSize: 13, color: "#a1a1aa", margin: "6px 0 0" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Por que */}
      <div style={{ padding: "80px 64px", borderBottom: "1px solid #1a3d20" }}>
        <p style={{ color: "#22c55e", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>POR QUE?</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 48, maxWidth: 600 }}>
          Por que o meio ambiente precisa de atenção agora.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {[
            { titulo: "Desmatamento acelerado", texto: "O Brasil perde milhões de hectares de floresta nativa por ano, fragmentando ecossistemas inteiros." },
            { titulo: "Espécies ameaçadas", texto: "Mais de 1.000 espécies brasileiras estão na lista de ameaçadas de extinção por perda de habitat." },
            { titulo: "Mudanças climáticas", texto: "O aumento da temperatura global afeta diretamente a biodiversidade, chuvas e a produção de alimentos." },
            { titulo: "Consumo excessivo", texto: "O modelo linear de produção e descarte gera toneladas de resíduos que poluem solos, rios e oceanos." },
          ].map((card, i) => (
            <div key={i} style={{ background: "#0a0a0a", border: "1px solid #1a3d20", borderRadius: 14, padding: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#fff" }}>{card.titulo}</h3>
              <p style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>{card.texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animais em extinção */}
      <div style={{ padding: "80px 64px", borderBottom: "1px solid #1a3d20" }}>
        <p style={{ color: "#22c55e", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>FAUNA</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 48 }}>Animais em extinção no Brasil</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {animais.map((a, i) => <CardEspecie key={i} item={a} />)}
        </div>
      </div>

      {/* Plantas em extinção */}
      <div style={{ padding: "80px 64px", borderBottom: "1px solid #1a3d20" }}>
        <p style={{ color: "#22c55e", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 12 }}>FLORA</p>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 48 }}>Plantas em extinção no Brasil</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {plantas.map((p, i) => <CardEspecie key={i} item={p} />)}
        </div>
      </div>

     

    </div>
  );
}

export default Home;