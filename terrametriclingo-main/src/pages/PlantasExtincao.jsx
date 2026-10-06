import { useState } from "react";
import { salvarProgressoCurso } from "../lib/progresso";

const capitulos = [
  {
    id: 1,
    titulo: "1. Por que as plantas desaparecem?",
    cor: "#4d7c0f",
    explicacao:
      "Assim como os animais, as espécies vegetais nativas também sofrem com a ação humana. Desmatamento, extração predatória para fins comerciais, monoculturas e mudanças climáticas reduzem drasticamente o habitat de milhares de plantas. Muitas espécies vegetais só existem em fragmentos isolados de floresta, o que aumenta ainda mais o risco de extinção.",
    perguntas: [
      { tipo: "multipla", texto: "Qual é uma das principais causas do desaparecimento de espécies vegetais nativas?", opcoes: ["Aumento das áreas de preservação", "Redução do uso de agrotóxicos", "Desmatamento e perda de habitat", "Maior fiscalização ambiental"], resposta: 2 },
      { tipo: "vf", texto: "A extração predatória de plantas para fins comerciais não representa ameaça às espécies nativas.", resposta: false },
      { tipo: "complete", texto: "Áreas cultivadas com uma única espécie vegetal em grande escala são chamadas de ___.", resposta: "monocultura" },
    ],
  },
  {
    id: 2,
    titulo: "2. Pau-brasil e a exploração histórica",
    cor: "#92400e",
    explicacao:
      "O pau-brasil, árvore que deu nome ao país, foi explorado intensamente durante o período colonial para a extração de um corante vermelho usado na tinturaria têxtil europeia. Essa exploração descontrolada quase levou a espécie à extinção. Hoje o pau-brasil é protegido por lei e símbolo de projetos de reflorestamento na Mata Atlântica.",
    perguntas: [
      { tipo: "multipla", texto: "Por que o pau-brasil ficou quase extinto?", opcoes: ["Exploração intensa durante o período colonial", "Ataque de pragas desconhecidas", "Mudança no clima do litoral", "Substituição por espécies invasoras"], resposta: 0 },
      { tipo: "vf", texto: "O pau-brasil deu nome ao país.", resposta: true },
      { tipo: "complete", texto: "O pau-brasil é nativo do bioma Mata ___.", resposta: "atlantica" },
    ],
  },
  {
    id: 3,
    titulo: "3. Orquídeas raras da Mata Atlântica",
    cor: "#a21caf",
    explicacao:
      "A Mata Atlântica abriga uma das maiores diversidades de orquídeas do mundo, muitas delas endêmicas — ou seja, só existem ali. A orquídea-fantasma, uma das mais raras, é encontrada apenas em fragmentos específicos de floresta. O tráfico e a coleta ilegal para fins ornamentais, somados à fragmentação de habitat, colocam diversas espécies de orquídeas em risco de extinção.",
    perguntas: [
      { tipo: "multipla", texto: "Qual ameaça afeta especialmente orquídeas raras como a orquídea-fantasma?", opcoes: ["Excesso de polinizadores", "Aumento da umidade das florestas", "Proteção legal insuficiente apenas em parques", "Tráfico e coleta ilegal para fins ornamentais"], resposta: 3 },
      { tipo: "vf", texto: "A orquídea-fantasma é encontrada facilmente em qualquer região do Brasil.", resposta: false },
      { tipo: "complete", texto: "A fragmentação de habitat reduz o espaço disponível para a ___ das plantas.", resposta: "reproducao" },
    ],
  },
  {
    id: 4,
    titulo: "4. Plantas medicinais ameaçadas",
    cor: "#15803d",
    explicacao:
      "Muitas plantas nativas possuem propriedades medicinais valiosas — e isso, paradoxalmente, também as coloca em risco. O jaborandi, planta nativa do Nordeste, tem suas folhas extraídas para a produção de pilocarpina, usada pela indústria farmacêutica. Quando feita sem manejo sustentável, essa extração compromete a sobrevivência da espécie na natureza.",
    perguntas: [
      { tipo: "multipla", texto: "Por que o jaborandi é extraído de forma predatória?", opcoes: ["É usado como madeira de construção", "Suas folhas são usadas pela indústria farmacêutica", "Suas raízes purificam a água", "É usado exclusivamente como planta ornamental"], resposta: 1 },
      { tipo: "vf", texto: "O extrativismo sustentável ajuda a preservar espécies medicinais nativas.", resposta: true },
      { tipo: "complete", texto: "O jaborandi é uma planta nativa do ___ do Brasil.", resposta: "nordeste" },
    ],
  },
  {
    id: 5,
    titulo: "5. Araucária e o Sul do Brasil",
    cor: "#0f766e",
    explicacao:
      "A araucária é o símbolo da região Sul do Brasil e da antiga Mata de Araucárias, que hoje ocupa apenas uma pequena fração da área original devido ao desmatamento histórico para exploração de madeira. Suas sementes, os pinhões, são fonte de alimento essencial para diversas espécies da fauna local, incluindo aves em risco de extinção.",
    perguntas: [
      { tipo: "multipla", texto: "Qual é a importância da araucária para a fauna do Sul do Brasil?", opcoes: ["Produz oxigênio em maior quantidade que outras árvores", "Serve apenas como madeira de exportação", "Suas sementes (pinhões) alimentam diversas espécies", "Impede a erosão do solo nas cidades"], resposta: 2 },
      { tipo: "vf", texto: "A Mata de Araucárias hoje ocupa a maior parte de sua área original.", resposta: false },
      { tipo: "complete", texto: "A araucária é considerada o símbolo da região ___ do Brasil.", resposta: "sul" },
    ],
  },
];

const letras = ["A", "B", "C", "D"];

export default function PlantasExtincao() {
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

    const perguntasAnteriores = capitulos.slice(0, capituloIndex).reduce((acc, c) => acc + c.perguntas.length, 0);
    const respondidasAteAgora = perguntasAnteriores + perguntaIndex + 1;
    const vaiFinalizar = perguntaIndex + 1 >= capituloAtual.perguntas.length && capituloIndex + 1 >= capitulos.length;
    salvarProgressoCurso("plantas", { perguntasRespondidas: respondidasAteAgora, totalPerguntas, concluido: vaiFinalizar, acertos: novosAcertos });

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