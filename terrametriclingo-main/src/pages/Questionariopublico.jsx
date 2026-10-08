import { useState } from "react";
import { useNavigate } from "react-router-dom";

const perguntas = [
  { texto: "Você separa resíduos recicláveis no dia a dia?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você evita o uso de plásticos descartáveis?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você reutiliza materiais sempre que possível?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você economiza água em atividades diárias?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você evita deixar luzes acesas sem necessidade?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você prefere produtos sustentáveis ao comprar?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você reduz o desperdício de alimentos?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você utiliza transporte sustentável?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você evita imprimir documentos desnecessários?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você descarta corretamente pilhas e eletrônicos?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você procura reduzir o consumo de energia elétrica?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você fecha a torneira ao escovar os dentes ou lavar louça?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você se preocupa com o impacto ambiental das suas ações?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você participa de ações ou projetos ambientais?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você incentiva outras pessoas a adotarem práticas sustentáveis?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você reaproveita folhas de papel (rascunho, verso da folha) antes de descartá-las?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você dá preferência a produtos reutilizáveis?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você reduz o consumo de produtos com muita embalagem?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você busca informações sobre sustentabilidade?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
  { texto: "Você verifica se os produtos possuem selos ou certificações ambientais antes de comprar?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"] },
];

export default function QuestionarioPublico() {
  const navigate = useNavigate();
  const [atual, setAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const [respostas, setRespostas] = useState([]);

  const responder = (j) => {
    const novasRespostas = [...respostas, j];
    const novosPontos = pontos + j;
    if (atual + 1 >= perguntas.length) {
      setPontos(novosPontos);
      setRespostas(novasRespostas);
      setFinalizado(true);
    } else {
      setPontos(novosPontos);
      setRespostas(novasRespostas);
      setAtual(atual + 1);
    }
  };

  const voltar = () => {
    if (atual === 0) return;
    const pontosDaPerguntaAnterior = respostas[atual - 1] || 0;
    setPontos(pontos - pontosDaPerguntaAnterior);
    setRespostas(respostas.slice(0, atual - 1));
    setAtual(atual - 1);
  };

  const getResultado = () => {
    const max = perguntas.length * 3;
    const pct = pontos / max;
    if (pct >= 0.8) return { texto: "Excelente! Você é muito consciente ambientalmente.", cor: "#4caf50" };
    if (pct >= 0.5) return { texto: "Bom! Você tem bons hábitos, mas pode melhorar.", cor: "#8bc34a" };
    return { texto: "Atenção! Há bastante espaço para melhorar seus hábitos.", cor: "#ff9800" };
  };

  if (finalizado) {
    const { texto, cor } = getResultado();
    return (
      <div style={s.tela}>
        <h1 style={{ fontSize: "36px", marginBottom: "16px", color: "#fff" }}>Resultado</h1>
        <p style={{ fontSize: "22px", color: cor, textAlign: "center", maxWidth: "500px", marginBottom: "8px" }}>{texto}</p>
        <p style={{ fontSize: "16px", color: "#aaa", marginBottom: "40px" }}>Pontuação: {pontos} / {perguntas.length * 3}</p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => navigate("/vitrine")} style={s.botaoPrimario}>Ver Vitrine Sustentável</button>
          <button onClick={() => navigate("/learn")} style={s.botaoSecundario}>Ver Cursos</button>
          <button onClick={() => { setAtual(0); setPontos(0); setRespostas([]); setFinalizado(false); }} style={s.botaoGhost}>Refazer</button>
        </div>
        <p style={{ marginTop: "32px", color: "#aaa", fontSize: "14px", textAlign: "center" }}>
          Quer salvar seu progresso?{" "}
          <span onClick={() => navigate("/loginsignup")} style={{ color: "#4caf50", cursor: "pointer", textDecoration: "underline" }}>
            Crie uma conta
          </span>
        </p>
      </div>
    );
  }

  const p = perguntas[atual];
  const respostaAtual = atual < respostas.length ? respostas[atual] : null;

  return (
    <div style={s.tela}>
      <div style={{ width: "100%", maxWidth: "600px", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", marginBottom: "8px" }}>
        <div style={{ width: `${((atual + 1) / perguntas.length) * 100}%`, height: "100%", background: "#4caf50", borderRadius: "10px", transition: "width 0.3s" }} />
      </div>
      <div style={{ width: "100%", maxWidth: "600px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        {atual > 0 ? (
          <button onClick={voltar} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#aaa", borderRadius: "8px", padding: "5px 14px", cursor: "pointer", fontSize: "13px" }}>
            ← Voltar
          </button>
        ) : (
          <span />
        )}
        <p style={{ color: "#aaa", margin: 0, fontSize: "14px" }}>{atual + 1} / {perguntas.length}</p>
      </div>
      <h2 style={{ fontSize: "24px", textAlign: "center", maxWidth: "600px", color: "#fff", marginBottom: "40px" }}>{p.texto}</h2>
      <div style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {p.opcoes.map((op, j) => (
          <div key={j} onClick={() => responder(j)} style={{ ...s.opcao, background: respostaAtual === j ? "rgba(76,175,80,0.35)" : s.opcao.background, border: respostaAtual === j ? "1px solid #4caf50" : s.opcao.border }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(76,175,80,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = respostaAtual === j ? "rgba(76,175,80,0.35)" : "rgba(28,39,31,0.6)"}
          >
            {op}
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  tela: { minHeight: "100vh", backgroundColor: "#111412", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", padding: "40px 16px" },
  opcao: { padding: "16px 24px", borderRadius: "14px", cursor: "pointer", background: "rgba(28,39,31,0.6)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "16px", color: "#fff", transition: "background 0.2s" },
  botaoPrimario: { padding: "12px 28px", borderRadius: "14px", border: "none", background: "#16a34a", color: "white", fontSize: "15px", cursor: "pointer", fontWeight: 600 },
  botaoSecundario: { padding: "12px 28px", borderRadius: "14px", border: "none", background: "#1d4ed8", color: "white", fontSize: "15px", cursor: "pointer", fontWeight: 600 },
  botaoGhost: { padding: "12px 28px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "white", fontSize: "15px", cursor: "pointer" },
};
