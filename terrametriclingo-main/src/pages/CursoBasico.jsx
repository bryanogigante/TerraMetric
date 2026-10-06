import { useState } from "react";

const capitulosBasico = [
  {
    id: 1,
    titulo: "1. Origem do Lixo e Revolução Industrial",
    explicacao:
      "Historicamente, a produção de lixo era limitada ao estritamente necessário. A Revolução Industrial transformou o modelo de produção para a larga escala, introduzindo hábitos de consumo acelerados e gerando volumes sem precedentes de resíduos.",
    perguntas: [
      { tipo: "complete", texto: "Antigamente, os seres humanos produziam pouco lixo porque consumiam apenas o ___.", resposta: "necessário" },
      { tipo: "vf", texto: "Os produtos antigos geralmente tinham maior durabilidade do que muitos produtos atuais.", resposta: true },
      { tipo: "multipla", texto: "Qual foi um dos principais impactos da Revolução Industrial?", opcoes: ["Produção em massa e aumento do lixo", "Diminuição drástica de resíduos nas metrópoles globais", "Redução imediata do tamanho das grandes cidades", "Fim do comércio internacional"], resposta: 0 }
    ]
  },
  {
    id: 2,
    titulo: "2. Obsolescência e Lixo Eletrônico",
    explicacao:
      "A obsolescência programada faz com que produtos sejam fabricados para durar pouco tempo, incentivando novas compras. O descarte incorreto de eletrônicos libera metais pesados perigosos no solo e em fontes de água.",
    perguntas: [
      { tipo: "multipla", texto: "O que é 'fast fashion'?", opcoes: ["Moda focada no uso de tecidos 100% orgânicos e reciclados", "Reutilização de roupas antigas", "Fabricação de roupas", "Roupas descartáveis para seguir tendências"], resposta: 3 },
      { tipo: "complete", texto: "A prática em que produtos são fabricados para durar menos tempo chama-se ___.", resposta: "obsolescência programada" },
      { tipo: "vf", texto: "O lixo eletrônico pode contaminar o solo e a água.", resposta: true }
    ]
  },
  {
    id: 3,
    titulo: "3. Impactos Ambientais do Lixo",
    explicacao:
      "Materiais sintéticos como o plástico levam séculos para se decompor, fragmentando-se em microplásticos. Além disso, lixões geram chorume, um líquido altamente tóxico que contamina o lençol freático.",
    perguntas: [
      { tipo: "multipla", texto: "Qual material leva centenas de anos para se decompor?", opcoes: ["Papel de jornal", "Plástico", "Algodão natural cru", "Sarrafo de madeira vegetal não tratada"], resposta: 1 },
      { tipo: "multipla", texto: "O que são microplásticos?", opcoes: ["Pequenos metais", "Tipos de vidro reciclável de alta densidade", "Partículas mínimas de plástico", "Restos orgânicos descartados"], resposta: 2 },
      { tipo: "complete", texto: "Os aterros sanitários possuem sistemas de controle do ___, líquido tóxico produzido pelo lixo.", resposta: "chorume" },
      { tipo: "multipla", texto: "Qual é o principal problema dos lixões?", opcoes: ["Geram energia limpa para a população local", "Não causam impactos significativos", "Melhoram a qualidade da água dos rios vizinhos", "Contaminam o solo"], resposta: 3 }
    ]
  },
  {
    id: 4,
    titulo: "4. Consumo Consciente e Responsabilidade",
    explicacao:
      "A reciclagem é fundamental, mas não resolve o problema sozinha. A prioridade deve ser reduzir o consumo. A gestão dos resíduos exige ação conjunta entre governos, indústrias e a população.",
    perguntas: [
      { tipo: "vf", texto: "A reciclagem sozinha resolve totalmente o problema do lixo.", resposta: false },
      { tipo: "multipla", texto: "O que significa o primeiro 'R' dos 3 Rs?", opcoes: ["Reduzir", "Reciclar os materiais descartados no dia a dia", "Recolher o lixo urbano", "Reformar móveis antigos"], resposta: 0 },
      { tipo: "complete", texto: "Consumir menos e evitar desperdícios faz parte do princípio de ___.", resposta: "reduzir" },
      { tipo: "multipla", texto: "Quem possui responsabilidade pelo problema do lixo?", opcoes: ["Apenas a população", "Governo, empresas e cidadãos", "Apenas as grandes indústrias e fábricas", "Apenas os órgãos do governo federal"], resposta: 1 }
    ]
  }
];

const letras = ["A", "B", "C", "D"];

// Função para calcular a Distância de Levenshtein (medidor de similaridade entre duas palavras)
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

export default function CursoBasico() {
  const [capituloIndex, setCapituloIndex] = useState(0);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [menuCapitulosAberto, setMenuCapitulosAberto] = useState(false);

  const totalPerguntas = capitulosBasico.reduce((acc, cap) => acc + cap.perguntas.length, 0);
  const capituloAtual = capitulosBasico[capituloIndex];
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
      } else if (capituloIndex + 1 < capitulosBasico.length) {
        setAcertos(novosAcertos);
        setCapituloIndex(capituloIndex + 1);
        setPerguntaIndex(0);
      } else {
        setAcertos(novosAcertos);
        setFinalizado(true);
      }
    }, 1000);
  };

  const responderMultipla = (i) => { if (feedback) return; avancar(i === p.resposta); };
  const responderVF = (val) => { if (feedback) return; avancar(val === p.resposta); };
  
  const responderComplete = () => {
    if (feedback) return;

    const normalizar = (s) =>
      s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const digitado = normalizar(inputVal);
    const correto = normalizar(p.resposta);

    // Permite margem de erro dependendo do tamanho da palavra
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
      <div style={estilos.topBar}>
        <button onClick={() => setMenuCapitulosAberto(!menuCapitulosAberto)} style={estilos.botaoCapitulos}>
          Capítulos
        </button>
      </div>

      {menuCapitulosAberto && (
        <div style={estilos.modal}>
          <h3 style={{ marginBottom: "16px", color: "#1a5c2a" }}>Selecione um Capítulo</h3>
          {capitulosBasico.map((cap, idx) => (
            <div key={cap.id} onClick={() => selecionarCapitulo(idx)} style={{ ...estilos.itemCapitulo, background: idx === capituloIndex ? "#1a5c2a" : "rgba(0,0,0,0.05)", color: idx === capituloIndex ? "#fff" : "#000" }}>
              {cap.titulo}
            </div>
          ))}
          <button onClick={() => setMenuCapitulosAberto(false)} style={estilos.botaoFecharModal}>Fechar</button>
        </div>
      )}

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
  modal: { position: "absolute", top: "70px", right: "20px", background: "#fff", padding: "20px", borderRadius: "14px", boxShadow: "0px 8px 20px rgba(0,0,0,0.2)", zIndex: 10, width: "320px", display: "flex", flexDirection: "column", gap: "8px" },
  itemCapitulo: { padding: "10px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
  botaoFecharModal: { marginTop: "10px", padding: "8px", border: "none", background: "#ccc", borderRadius: "8px", cursor: "pointer" },
  caixaExplicacao: { background: "rgba(255,255,255,0.85)", borderRadius: "14px", padding: "20px", maxWidth: "620px", width: "100%", marginBottom: "12px", borderLeft: "5px solid #1a5c2a" },
  opcao: { padding: "16px 24px", borderRadius: "14px", cursor: "pointer", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(0,0,0,0.1)", fontSize: "16px", color: "#000", display: "flex", alignItems: "center", gap: "12px" },
  letra: { fontWeight: "bold", color: "#1a5c2a", minWidth: "20px" },
  input: { width: "100%", padding: "14px 20px", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.2)", background: "rgba(255,255,255,0.5)", color: "#000", fontSize: "16px", outline: "none" },
  botao: { padding: "12px 40px", borderRadius: "14px", border: "none", background: "#1a5c2a", color: "white", fontSize: "16px", cursor: "pointer" },
  botaoReiniciar: { marginTop: "32px", padding: "12px 30px", borderRadius: "20px", border: "none", background: "#1a5c2a", color: "white", fontSize: "16px", cursor: "pointer" },
};