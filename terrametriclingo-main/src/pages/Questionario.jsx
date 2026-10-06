import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const perguntas = [
  { texto: "Você separa resíduos recicláveis no dia a dia?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Reciclagem" },
  { texto: "Você evita o uso de plásticos descartáveis?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Plástico" },
  { texto: "Você reutiliza materiais sempre que possível?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Reutilização" },
  { texto: "Você economiza água em atividades diárias?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Água" },
  { texto: "Você evita deixar luzes acesas sem necessidade?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Energia" },
  { texto: "Você prefere produtos sustentáveis ao comprar?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Consumo" },
  { texto: "Você reduz o desperdício de alimentos?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Alimentos" },
  { texto: "Você utiliza transporte sustentável?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Transporte" },
  { texto: "Você evita imprimir documentos desnecessários?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Papel" },
  { texto: "Você descarta corretamente pilhas e eletrônicos?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Lixo Eletrônico" },
  { texto: "Você procura reduzir o consumo de energia elétrica?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Energia" },
  { texto: "Você fecha a torneira ao escovar os dentes ou lavar louça?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Água" },
  { texto: "Você se preocupa com o impacto ambiental das suas ações?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Consciência" },
  { texto: "Você participa de ações ou projetos ambientais?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Engajamento" },
  { texto: "Você incentiva outras pessoas a adotarem práticas sustentáveis?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Engajamento" },
  { texto: "Você reaproveita folhas de papel (rascunho, verso da folha) antes de descartá-las?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Papel" },
  { texto: "Você dá preferência a produtos reutilizáveis?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Reutilização" },
  { texto: "Você reduz o consumo de produtos com muita embalagem?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Consumo" },
  { texto: "Você busca informações sobre sustentabilidade?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Consciência" },
  { texto: "Você verifica se os produtos possuem selos ou certificações ambientais antes de comprar?", opcoes: ["Nunca", "Raramente", "Frequentemente", "Sempre"], topico: "Consciência" },
];

export default function Questionario() {
  const [atual, setAtual] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  const salvarResultado = async (novosPontos, todasRespostas) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Calcular pontuação por tópico
    const topicos = {};
    perguntas.forEach((p, i) => {
      if (!topicos[p.topico]) topicos[p.topico] = { pontos: 0, total: 0 };
      topicos[p.topico].pontos += todasRespostas[i] || 0;
      topicos[p.topico].total += 3;
    });

    await supabase.from("resultados").insert({
      user_id: user.id,
      pontos: novosPontos,
      total: perguntas.length * 3,
      topicos,
    });
    return user;
  };

  const responder = async (j) => {
    if (enviando) return;
    const novasRespostas = [...respostas, j];
    const novosPontos = pontos + j;

    if (atual + 1 >= perguntas.length) {
      setEnviando(true);
      try {
        const user = await salvarResultado(novosPontos, novasRespostas);
        navigate(user ? "/dashboard" : "/vitrine");
      } finally {
        setEnviando(false);
      }
    } else {
      setPontos(novosPontos);
      setRespostas(novasRespostas);
      setAtual(atual + 1);
    }
  };

  const voltar = () => {
    if (atual === 0 || enviando) return;
    const pontosDaPerguntaAnterior = respostas[atual - 1] || 0;
    setPontos(pontos - pontosDaPerguntaAnterior);
    setRespostas(respostas.slice(0, atual - 1));
    setAtual(atual - 1);
  };

  const p = perguntas[atual];
  const progresso = ((atual + 1) / perguntas.length) * 100;
  const respostaAtual = atual < respostas.length ? respostas[atual] : null;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111412", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", padding: "40px" }}>
      <div style={{ width: "100%", maxWidth: "600px", height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "10px", marginBottom: "40px" }}>
        <div style={{ width: `${progresso}%`, height: "100%", background: "#4caf50", borderRadius: "10px", transition: "width 0.3s" }} />
      </div>
      <div style={{ width: "100%", maxWidth: "600px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        {atual > 0 ? (
          <button
            onClick={voltar}
            disabled={enviando}
            style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "#aaa", borderRadius: "8px", padding: "5px 14px", cursor: enviando ? "default" : "pointer", fontSize: "13px" }}
          >
            ← Voltar
          </button>
        ) : (
          <span />
        )}
        <p style={{ color: "#aaa", margin: 0 }}>{atual + 1} / {perguntas.length}</p>
      </div>
      <h2 style={{ fontSize: "24px", textAlign: "center", maxWidth: "600px", marginBottom: "40px" }}>{p.texto}</h2>
      <div style={{ width: "100%", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "12px", opacity: enviando ? 0.6 : 1, pointerEvents: enviando ? "none" : "auto" }}>
        {p.opcoes.map((op, j) => (
          <div
            key={j}
            onClick={() => responder(j)}
            style={{ padding: "16px 24px", borderRadius: "14px", cursor: "pointer", background: respostaAtual === j ? "rgba(76,175,80,0.35)" : "rgba(28, 39, 31, 0.6)", border: respostaAtual === j ? "1px solid #4caf50" : "1px solid rgba(255,255,255,0.1)", fontSize: "16px", transition: "background 0.2s" }}
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