import { useState } from "react";

const capitulos = [
  {
    id: 1,
    titulo: "1. Por que espécies somem?",
    cor: "#b45309",
    explicacao:
      "A extinção de espécies é um processo natural, mas a ação humana acelerou esse processo de forma alarmante. Desmatamento, caça ilegal, poluição, mudanças climáticas e destruição de habitats são as principais causas da perda de biodiversidade no planeta. Segundo a ONU, estamos vivendo a sexta extinção em massa da história da Terra — e desta vez, ela é causada pelos seres humanos. Estima-se que a taxa de extinção atual é de 100 a 1000 vezes maior do que a taxa natural.",
    perguntas: [
      { tipo: "multipla", texto: "Segundo a ONU, qual extinção em massa estamos vivendo atualmente?", opcoes: ["A primeira extinção em massa", "A sexta extinção em massa", "A terceira extinção em massa", "Não estamos vivendo uma extinção em massa"], resposta: 1 },
      { tipo: "vf", texto: "A extinção de espécies é sempre um processo natural, sem relação com a ação humana.", resposta: false },
      { tipo: "complete", texto: "A taxa de extinção atual é de 100 a 1000 vezes maior que a taxa ___.", resposta: "natural" },
    ],
  },
  {
    id: 2,
    titulo: "2. Animais do Brasil em risco",
    cor: "#15803d",
    explicacao:
      "O Brasil possui uma das maiores biodiversidades do mundo, mas também uma das maiores listas de animais ameaçados. Entre os mais conhecidos estão a onça-pintada, o mico-leão-dourado, o lobo-guará, a arara-azul e a tartaruga-de-couro. O desmatamento da Amazônia, do Cerrado e da Mata Atlântica são as principais ameaças para essas espécies. O Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio) lista mais de 1.100 espécies brasileiras ameaçadas de extinção.",
    perguntas: [
      { tipo: "multipla", texto: "Qual órgão brasileiro lista oficialmente as espécies ameaçadas de extinção no país?", opcoes: ["IBAMA", "INPE", "FUNAI", "ICMBio"], resposta: 3 },
      { tipo: "vf", texto: "O mico-leão-dourado é uma espécie ameaçada da Mata Atlântica.", resposta: true },
      { tipo: "complete", texto: "O desmatamento da Amazônia, do Cerrado e da Mata Atlântica são as principais ___ para essas espécies.", resposta: "ameaças" },
    ],
  },
  {
    id: 3,
    titulo: "3. Fauna marinha ameaçada",
    cor: "#0369a1",
    explicacao:
      "Os oceanos cobrem 70% da Terra, mas a vida marinha enfrenta ameaças crescentes: pesca predatória, poluição por plástico, aquecimento das águas e acidificação dos oceanos. Animais como o tubarão-baleia, a baleia jubarte, o boto-cor-de-rosa e diversas espécies de tartarugas marinhas estão em risco. Calcula-se que 8 milhões de toneladas de plástico entram nos oceanos por ano, causando morte e sofrimento para milhares de animais marinhos.",
    perguntas: [
      { tipo: "multipla", texto: "Quantas toneladas de plástico entram nos oceanos por ano, aproximadamente?", opcoes: ["8 milhões de toneladas", "8 mil toneladas", "800 mil toneladas", "80 milhões de toneladas"], resposta: 0 },
      { tipo: "vf", texto: "A acidificação dos oceanos não representa nenhuma ameaça à fauna marinha.", resposta: false },
      { tipo: "complete", texto: "O boto-cor-de-rosa e a baleia jubarte são exemplos de fauna ___ ameaçada.", resposta: "marinha" },
    ],
  },
  {
    id: 4,
    titulo: "4. Projetos de conservação",
    cor: "#7c3aed",
    explicacao:
      "Existem iniciativas importantes ao redor do mundo para proteger espécies ameaçadas. No Brasil, o Projeto Tamar protege as tartarugas marinhas há mais de 40 anos. O Programa de Conservação do Mico-Leão-Dourado reintroduziu centenas de animais na Mata Atlântica. Internacionalmente, o WWF, a IUCN e diversas ONGs trabalham para proteger habitats e combater o tráfico de animais silvestres. Áreas de proteção ambiental, corredores ecológicos e reprodução em cativeiro são estratégias fundamentais.",
    perguntas: [
      { tipo: "multipla", texto: "Qual projeto brasileiro protege as tartarugas marinhas há mais de 40 anos?", opcoes: ["Projeto Golfinho Rotador", "Projeto Peixe-Boi", "Projeto Tamar", "Projeto Baleia Franca"], resposta: 2 },
      { tipo: "vf", texto: "A reprodução em cativeiro é uma das estratégias usadas na conservação de espécies ameaçadas.", resposta: true },
      { tipo: "complete", texto: "O WWF e a IUCN são exemplos de ___ que atuam na proteção de espécies.", resposta: "ongs" },
    ],
  },
  {
    id: 5,
    titulo: "5. Como você pode ajudar",
    cor: "#16a34a",
    explicacao:
      "Cada pessoa pode contribuir para a conservação da biodiversidade. Você pode: nunca comprar animais silvestres ou produtos de origem ilegal; denunciar o tráfico de animais pelo número 0800 61 8080; reduzir o consumo de plástico; apoiar ONGs e projetos de conservação; consumir produtos com certificação ambiental; visitar parques nacionais e reservas; e educar outras pessoas sobre a importância da biodiversidade. Pequenas ações individuais, somadas, fazem uma enorme diferença.",
    perguntas: [
      { tipo: "multipla", texto: "Qual número pode ser usado para denunciar o tráfico de animais silvestres no Brasil?", opcoes: ["190", "0800 61 8080", "199", "181"], resposta: 1 },
      { tipo: "vf", texto: "Comprar animais silvestres de origem ilegal ajuda a preservar as espécies.", resposta: false },
      { tipo: "complete", texto: "Cada pessoa pode contribuir reduzindo o consumo de ___ e apoiando projetos de conservação.", resposta: "plástico" },
    ],
  },
];

const letras = ["A", "B", "C", "D"];

export default function AnimaisExtincao() {
  const [capituloIndex, setCapituloIndex] = useState(0);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [menuCapitulosAberto, setMenuCapitulosAberto] = useState(false);

  const totalPerguntas = capitulos.reduce((acc, cap) => acc + cap.perguntas.length, 0);
  const capituloAtual = capitulos[capituloIndex];
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
      } else if (capituloIndex + 1 < capitulos.length) {
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
    const normalizar = (s) => s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    avancar(normalizar(inputVal) === normalizar(p.resposta));
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
        <p style={{ fontSize: "22px", color: pct >= 0.7 ? "#4ade80" : "#fbbf24", textAlign: "center" }}>{msg}</p>
        <p style={{ marginTop: "12px", color: "#d1d5db", fontSize: "18px" }}>{acertos} / {totalPerguntas} acertos</p>
        <button onClick={() => { setCapituloIndex(0); setPerguntaIndex(0); setAcertos(0); setFinalizado(false); }} style={estilos.botaoReiniciar}>
          Tentar novamente
        </button>
      </div>
    );
  }

  const feedbackColor = feedback === "certo" ? "rgba(76,175,80,0.25)" : feedback === "errado" ? "rgba(244,67,54,0.25)" : "transparent";

  return (
    <div style={{ ...estilos.tela, background: feedback ? feedbackColor : "#0a0a0a", transition: "background 0.3s" }}>
      {/* Botão de capítulos */}
      <div style={estilos.topBar}>
        <button onClick={() => setMenuCapitulosAberto(!menuCapitulosAberto)} style={estilos.botaoCapitulos}>
          Capítulos
        </button>
      </div>

      {/* Seleção de capítulos */}
      {menuCapitulosAberto && (
        <div style={estilos.modal}>
          <h3 style={{ marginBottom: "16px", color: "#fff" }}>Selecione um Capítulo</h3>
          {capitulos.map((cap, idx) => (
            <div key={cap.id} onClick={() => selecionarCapitulo(idx)} style={{ ...estilos.itemCapitulo, background: idx === capituloIndex ? cap.cor : "rgba(255,255,255,0.06)", color: "#fff" }}>
              {cap.titulo}
            </div>
          ))}
          <button onClick={() => setMenuCapitulosAberto(false)} style={estilos.botaoFecharModal}>Fechar</button>
        </div>
      )}

      {/* Cabeçalho do capítulo atual */}
      <div style={{ ...estilos.caixaExplicacao, borderLeft: `5px solid ${capituloAtual.cor}` }}>
        <h3 style={{ fontSize: "20px", color: capituloAtual.cor, marginBottom: "8px" }}>{capituloAtual.titulo}</h3>
        <p style={{ fontSize: "15px", lineHeight: "1.5", color: "rgba(255,255,255,0.8)" }}>{capituloAtual.explicacao}</p>
      </div>

      <p style={{ color: "#9ca3af", margin: "16px 0 8px 0", fontSize: "14px" }}>
        Pergunta {perguntaIndex + 1} de {capituloAtual.perguntas.length} deste capítulo
      </p>

      <h2 style={{ fontSize: "22px", textAlign: "center", maxWidth: "620px", marginBottom: "28px", lineHeight: "1.5", color: "#fff" }}>
        {p.texto}
      </h2>

      {p.tipo === "multipla" && (
        <div style={{ width: "100%", maxWidth: "620px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {p.opcoes.map((op, i) => (
            <div key={i} onClick={() => responderMultipla(i)} style={estilos.opcao}>
              <span style={{ ...estilos.letra, color: capituloAtual.cor }}>{letras[i]}</span> {op}
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
          <button onClick={responderComplete} style={{ ...estilos.botao, background: capituloAtual.cor }}>Confirmar</button>
        </div>
      )}

      {feedback && (
        <p style={{ marginTop: "24px", fontSize: "20px", color: feedback === "certo" ? "#4ade80" : "#f87171" }}>
          {feedback === "certo" ? "Correto!" : `Errado! Resposta: ${typeof p.resposta === "boolean" ? (p.resposta ? "Verdadeiro" : "Falso") : p.tipo === "multipla" ? p.opcoes[p.resposta] : p.resposta}`}
        </p>
      )}
    </div>
  );
}

const estilos = {
  tela: { minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "20px", position: "relative" },
  topBar: { position: "absolute", top: "20px", right: "20px" },
  botaoCapitulos: { padding: "10px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", color: "#fff", fontWeight: "bold", cursor: "pointer" },
  modal: { position: "absolute", top: "70px", right: "20px", background: "#111", padding: "20px", borderRadius: "14px", boxShadow: "0px 8px 20px rgba(0,0,0,0.5)", zIndex: 10, width: "320px", display: "flex", flexDirection: "column", gap: "8px", border: "1px solid rgba(255,255,255,0.1)" },
  itemCapitulo: { padding: "10px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "14px" },
  botaoFecharModal: { marginTop: "10px", padding: "8px", border: "none", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "8px", cursor: "pointer" },
  caixaExplicacao: { background: "rgba(255,255,255,0.05)", borderRadius: "14px", padding: "20px", maxWidth: "620px", width: "100%", marginBottom: "12px" },
  opcao: { padding: "16px 24px", borderRadius: "14px", cursor: "pointer", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "16px", color: "#fff", display: "flex", alignItems: "center", gap: "12px" },
  letra: { fontWeight: "bold", minWidth: "20px" },
  input: { width: "100%", padding: "14px 20px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: "16px", outline: "none" },
  botao: { padding: "12px 40px", borderRadius: "14px", border: "none", color: "white", fontSize: "16px", cursor: "pointer" },
  botaoReiniciar: { marginTop: "32px", padding: "12px 30px", borderRadius: "20px", border: "none", background: "#16a34a", color: "white", fontSize: "16px", cursor: "pointer" },
};