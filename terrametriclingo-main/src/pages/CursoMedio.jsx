import { useState } from "react";

const capitulosMedio = [
  {
    id: 1,
    titulo: "1. Mudanças Climáticas",
    explicacao:
      "As mudanças climáticas referem-se a alterações de longo prazo nas temperaturas e padrões climáticos globais. Embora ocorram naturalmente, as atividades humanas — como a queima de combustíveis fósseis e o desmatamento — aceleraram o efeito estufa, resultando em eventos climáticos extremos, derretimento de geleiras e elevação do nível do mar.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual das alternativas representa a principal causa do agravamento das mudanças climáticas atuais?",
        opcoes: [
          "Flutuações regulares nos ciclos de radiação emitida pelo Sol",
          "Aumento contínuo da cobertura de áreas florestadas no planeta",
          "Queima intensiva de combustíveis fósseis",
          "Processos naturais e espontâneos de decomposição da matéria orgânica"
        ],
        resposta: 2
      },
      {
        tipo: "complete",
        texto: "O gás produzido pela decomposição de matéria orgânica em aterros que contribui para o efeito estufa é o ___.",
        resposta: "metano"
      },
      {
        tipo: "vf",
        texto: "A conservação de florestas nativas ajuda a capturar o carbono da atmosfera, reduzindo os impactos do efeito estufa.",
        resposta: true
      }
    ]
  },
  {
    id: 2,
    titulo: "2. Energia Renovável",
    explicacao:
      "A transição energética envolve substituir fontes poluidoras e finitas (como petróleo e carvão) por energias limpas e renováveis, geradas por recursos inesgotáveis como o sol, o vento e a água. O uso de energias renováveis é fundamental para reduzir a emissão de gases poluentes e combater o aquecimento global.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual das opções abaixo é uma fonte inesgotável e limpa de energia?",
        opcoes: [
          "Carvão mineral de jazidas profundas",
          "Petróleo bruto e seus derivados",
          "Gás natural comprimido",
          "Energia eólica"
        ],
        resposta: 3
      },
      {
        tipo: "vf",
        texto: "Os combustíveis fósseis são considerados limpos porque se renovam rapidamente na natureza.",
        resposta: false
      },
      {
        tipo: "complete",
        texto: "A energia gerada a partir da luz solar captada por painéis fotovoltaicos é chamada de energia ___.",
        resposta: "solar"
      }
    ]
  },
  {
    id: 3,
    titulo: "3. Água e Recursos Naturais",
    explicacao:
      "A água potável é um recurso essencial e finito. A contaminação do solo por chorume em lixões, o despejo de efluentes industriais e a poluição por microplásticos ameaçam os recursos hídricos e os ecossistemas, tornando urgente o descarte correto de resíduos e a proteção dos rios e lençóis freáticos.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual é a principal consequência da presença de microplásticos nos ecossistemas aquáticos?",
        opcoes: [
          "Contaminação da cadeia alimentar",
          "Elevação vertiginosa do nível de oxigenação dissolvido na água",
          "Ampliação imediata da biodiversidade de espécies marinhas nativas",
          "Redução drástica e espontânea do nível de poluição química geral"
        ],
        resposta: 0
      },
      {
        tipo: "multipla",
        texto: "O chorume produzido pelo acúmulo descontrolado de lixo pode provocar:",
        opcoes: [
          "Enriquecimento mineral favorável e purificação natural dos reservatórios hídricos",
          "Contaminação do solo e dos lençóis freáticos",
          "Neutralização imediata de compostos químicos nocivos ao meio ambiente",
          "Crescimento acelerado e saudável da vegetação nas áreas urbanas circundantes"
        ],
        resposta: 1
      },
      {
        tipo: "vf",
        texto: "O lixo eletrônico descartado incorretamente pode liberar metais pesados e contaminar fontes de água potável.",
        resposta: true
      }
    ]
  },
  {
    id: 4,
    titulo: "4. Consumo Consciente",
    explicacao:
      "O consumo consciente propõe repensar os hábitos diários antes de realizar uma compra, levando em conta os impactos sociais e ambientais. Combater a obsolescência programada, reduzir o consumo descartável e praticar a Economia Circular são passos essenciais para diminuir a geração de resíduos.",
    perguntas: [
      {
        tipo: "complete",
        texto: "Quando um produto é projetado para se tornar descartável ou inútil em pouco tempo, ocorre a ___.",
        resposta: "obsolescencia programada"
      },
      {
        tipo: "multipla",
        texto: "Qual alternativa representa melhor o princípio dos 5 Rs da sustentabilidade?",
        opcoes: [
          "Comprar bens, utilizar até o fim, descartar no lixo, substituir rápido e repetir tudo",
          "Fabricar produtos, consumir sem limites, comercializar sobras, reciclar e jogar fora",
          "Reduzir, reutilizar, reciclar, repensar e recusar",
          "Coletar resíduos, separar materiais, estocar itens, revender tudo e reaproveitar peças"
        ],
        resposta: 2
      },
      {
        tipo: "multipla",
        texto: "A prática do fast fashion é frequentemente criticada porque:",
        opcoes: [
          "Gera economia extrema do uso de insumos naturais nas indústrias",
          "Foca exclusivamente na fabricação de tecidos duráveis de altíssima qualidade",
          "Garante o reaproveitamento integral de todas as fibras têxteis descartadas",
          "Estimula o consumo excessivo e gera grande volume de resíduos"
        ],
        resposta: 3
      },
      {
        tipo: "vf",
        texto: "A responsabilidade pela gestão ambiental deve ser compartilhada entre governos, empresas e consumidores.",
        resposta: true
      }
    ]
  },
  {
    id: 5,
    titulo: "5. Cidades Sustentáveis",
    explicacao:
      "Cidades sustentáveis planejam seu crescimento urbano conciliando eficiência econômica, bem-estar social e preservação ambiental. Isso abrange o fortalecimento do transporte público elétrico, ampliação de áreas verdes, gestão eficiente de resíduos e expansão do saneamento básico e da coleta seletiva.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual ação é prioritária no planejamento de uma cidade sustentável?",
        opcoes: [
          "Investir em transporte coletivo eficiente e mobilidade limpa",
          "Remover parques e praças para construir amplos estacionamentos de veículos privados",
          "Fomentar o uso massivo de embalagens plásticas descartáveis de uso único",
          "Desativar completamente as redes urbanas de recolhimento de materiais recicláveis"
        ],
        resposta: 0
      },
      {
        tipo: "complete",
        texto: "A coleta que separa resíduos recicláveis de resíduos orgânicos na cidade é chamada de coleta ___.",
        resposta: "seletiva"
      },
      {
        tipo: "vf",
        texto: "A implantação de parques e áreas verdes urbanas ajuda a reduzir ilhas de calor e melhora a qualidade do ar nas cidades.",
        resposta: true
      },
      {
        tipo: "complete",
        texto: "O desenvolvimento sustentável busca atender às necessidades atuais sem comprometer as gerações ___.",
        resposta: "futuras"
      }
    ]
  }
];

const letras = ["A", "B", "C", "D"];

// Algoritmo de Distância de Levenshtein para tolerancia a erros de digitação
function calcularDistanciaLevenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

export default function CursoMedio() {
  const [capituloIndex, setCapituloIndex] = useState(0);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [menuCapitulosAberto, setMenuCapitulosAberto] = useState(false);

  // Total de perguntas calculadas dinamicamente
  const totalPerguntas = capitulosMedio.reduce((acc, cap) => acc + cap.perguntas.length, 0);

  const capituloAtual = capitulosMedio[capituloIndex];
  const p = capituloAtual.perguntas[perguntaIndex];

  const avancar = (acertou) => {
    const novosAcertos = acertou ? acertos + 1 : acertos;
    setFeedback(acertou ? "certo" : "errado");
    setTimeout(() => {
      setFeedback(null);
      setInputVal("");

      if (perguntaIndex + 1 < capituloAtual.perguntas.length) {
        setAcertos(novosAcertos);
        setPerguntaIndex(perguntaIndex + 1);
      } else if (capituloIndex + 1 < capitulosMedio.length) {
        setAcertos(novosAcertos);
        setCapituloIndex(capituloIndex + 1);
        setPerguntaIndex(0);
      } else {
        setAcertos(novosAcertos);
        setFinalizado(true);
      }
    }, 1200);
  };

  const responderMultipla = (i) => { if (feedback) return; avancar(i === p.resposta); };
  const responderVF = (val) => { if (feedback) return; avancar(val === p.resposta); };

  const responderComplete = () => {
    if (feedback) return;

    const normalizar = (s) =>
      s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const digitado = normalizar(inputVal);
    const correto = normalizar(p.resposta);

    // Ajusta a tolerância de erros baseando-se no tamanho da palavra/frase
    const distancia = calcularDistanciaLevenshtein(digitado, correto);
    const limiteErros = correto.length > 10 ? 3 : correto.length > 5 ? 2 : 1;

    const acertou = distancia <= limiteErros;
    avancar(acertou);
  };

  const selecionarCapitulo = (idx) => {
    setCapituloIndex(idx);
    setPerguntaIndex(0);
    setFinalizado(false);
    setFeedback(null);
    setInputVal("");
    setMenuCapitulosAberto(false);
  };

  if (finalizado) {
    const pct = acertos / totalPerguntas;
    const msg = pct === 1 ? "Perfeito! Você acertou tudo!" : pct >= 0.7 ? "Muito bom! Continue assim!" : "Continue estudando! Você pode melhorar!";
    return (
      <div style={estilos.tela}>
        <h1 style={{ fontSize: "36px", marginBottom: "16px" }}>Resultado</h1>
        <p style={{ fontSize: "22px", color: pct >= 0.7 ? "#1a5c2a" : "#7a4000", textAlign: "center" }}>{msg}</p>
        <p style={{ marginTop: "12px", color: "#1a3d20", fontSize: "18px" }}>{acertos} / {totalPerguntas} acertos</p>
        <button onClick={() => { setCapituloIndex(0); setPerguntaIndex(0); setAcertos(0); setFinalizado(false); }} style={estilos.botaoReiniciar}>
          Tentar novamente
        </button>
      </div>
    );
  }

  const feedbackColor = feedback === "certo" ? "rgba(76,175,80,0.3)" : feedback === "errado" ? "rgba(244,67,54,0.3)" : "transparent";

  return (
    <div style={{ ...estilos.tela, background: feedbackColor, transition: "background 0.3s" }}>
      {/* Botão para abrir modal de capítulos */}
      <div style={estilos.topBar}>
        <button onClick={() => setMenuCapitulosAberto(!menuCapitulosAberto)} style={estilos.botaoCapitulos}>
          Capítulos
        </button>
      </div>

      {/* Menu modal de capítulos */}
      {menuCapitulosAberto && (
        <div style={estilos.modal}>
          <h3 style={{ marginBottom: "16px", color: "#1a5c2a" }}>Selecione um Capítulo</h3>
          {capitulosMedio.map((cap, idx) => (
            <div key={cap.id} onClick={() => selecionarCapitulo(idx)} style={{ ...estilos.itemCapitulo, background: idx === capituloIndex ? "#1a5c2a" : "rgba(0,0,0,0.05)", color: idx === capituloIndex ? "#fff" : "#000" }}>
              {cap.titulo}
            </div>
          ))}
          <button onClick={() => setMenuCapitulosAberto(false)} style={estilos.botaoFecharModal}>Fechar</button>
        </div>
      )}

      {/* Caixa contendo o resumo/explicação do capítulo */}
      <div style={estilos.caixaExplicacao}>
        <h3 style={{ fontSize: "20px", color: "#1a3d20", marginBottom: "8px" }}>{capituloAtual.titulo}</h3>
        <p style={{ fontSize: "15px", lineHeight: "1.4", color: "#2d3748" }}>{capituloAtual.explicacao}</p>
      </div>

      <p style={{ color: "#1a3d20", margin: "16px 0 8px 0", fontSize: "14px" }}>
        Pergunta {perguntaIndex + 1} de {capituloAtual.perguntas.length} deste capítulo
      </p>

      <h2 style={{ fontSize: "22px", textAlign: "center", maxWidth: "620px", marginBottom: "28px", lineHeight: "1.5", color: "#000" }}>
        {p.texto}
      </h2>

      {/* Renderização condicional por tipo de questão */}
      {p.tipo === "multipla" && (
        <div style={{ width: "100%", maxWidth: "620px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {p.opcoes.map((op, i) => (
            <div key={i} onClick={() => responderMultipla(i)} style={estilos.opcao}>
              <span style={estilos.letra}>{letras[i]}</span> {op}
            </div>
          ))}
        </div>
      )}

      {p.tipo === "vf" && (
        <div style={{ display: "flex", gap: "16px" }}>
          <div onClick={() => responderVF(true)} style={{ ...estilos.opcao, width: "140px", justifyContent: "center" }}>Verdadeiro</div>
          <div onClick={() => responderVF(false)} style={{ ...estilos.opcao, width: "140px", justifyContent: "center" }}>Falso</div>
        </div>
      )}

      {p.tipo === "complete" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%", maxWidth: "620px" }}>
          <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => e.key === "Enter" && responderComplete()} placeholder="Digite sua resposta..." style={estilos.input} />
          <button onClick={responderComplete} style={estilos.botao}>Confirmar</button>
        </div>
      )}

      {feedback && (
        <p style={{ marginTop: "24px", fontSize: "20px", color: feedback === "certo" ? "#1a5c2a" : "#c0392b" }}>
          {feedback === "certo" ? "Correto!" : `Errado! Resposta: ${typeof p.resposta === "boolean" ? (p.resposta ? "Verdadeiro" : "Falso") : p.tipo === "multipla" ? p.opcoes[p.resposta] : p.resposta}`}
        </p>
      )}
    </div>
  );
}

const estilos = {
  tela: { minHeight: "100vh", backgroundColor: "#4a7c59", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#000", padding: "20px", position: "relative" },
  topBar: { position: "absolute", top: "20px", right: "20px" },
  botaoCapitulos: { padding: "10px 18px", borderRadius: "12px", border: "none", background: "#1a5c2a", color: "#fff", fontWeight: "bold", cursor: "pointer" },
  modal: { position: "absolute", top: "70px", right: "20px", background: "#fff", padding: "20px", borderRadius: "14px", boxShadow: "0px 8px 20px rgba(0,0,0,0.2)", zIndex: 10, width: "320px", display: "flex", flexDirection: "column", gap: "8px", maxHeight: "80vh", overflowY: "auto" },
  itemCapitulo: { padding: "10px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
  botaoFecharModal: { marginTop: "10px", padding: "8px", border: "none", background: "#ccc", borderRadius: "8px", cursor: "pointer" },
  caixaExplicacao: { background: "rgba(255,255,255,0.85)", borderRadius: "14px", padding: "20px", maxWidth: "620px", width: "100%", marginBottom: "12px", borderLeft: "5px solid #1a5c2a" },
  opcao: { padding: "16px 24px", borderRadius: "14px", cursor: "pointer", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.1)", fontSize: "16px", color: "#000", display: "flex", alignItems: "center", gap: "12px" },
  letra: { fontWeight: "bold", color: "#1a5c2a", minWidth: "20px" },
  input: { width: "100%", padding: "14px 20px", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.2)", background: "rgba(255,255,255,0.5)", color: "#000", fontSize: "16px", outline: "none" },
  botao: { padding: "12px 40px", borderRadius: "14px", border: "none", background: "#1a5c2a", color: "white", fontSize: "16px", cursor: "pointer" },
  botaoReiniciar: { marginTop: "32px", padding: "12px 30px", borderRadius: "20px", border: "none", background: "#1a5c2a", color: "white", fontSize: "16px", cursor: "pointer" },
};