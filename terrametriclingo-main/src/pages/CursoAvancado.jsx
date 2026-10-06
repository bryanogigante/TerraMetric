import { useState } from "react";

const capitulosAvancado = [
  {
    id: 1,
    titulo: "1. Política Ambiental Global",
    explicacao:
      "A política ambiental global lida com a cooperação entre nações para enfrentar desafios ecológicos transfronteiriços, estabelecendo normas e agências como o PNUMA (Programa das Nações Unidas para o Meio Ambiente).",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual órgão das Nações Unidas é o principal responsável por coordenar as respostas a questões ambientais globais?",
        opcoes: [
          "PNUMA",
          "UNESCO (Organização para Educação, Ciência e Cultura)",
          "OMS (Organização Mundial da Saúde Global)",
          "FAO (Organização de Alimentação e Agricultura)"
        ],
        resposta: 0
      },
      {
        tipo: "complete",
        texto: "Problemas ambientais que ultrapassam fronteiras nacionais são classificados como problemas ___.",
        resposta: "transfronteiriços"
      },
      {
        tipo: "vf",
        texto: "Políticas ambientais globais possuem aplicação imediata e soberana sobre as leis locais de qualquer país sem necessidade de ratificação.",
        resposta: false
      }
    ]
  },
  {
    id: 2,
    titulo: "2. Acordos Climáticos Internacionais",
    explicacao:
      "Tratados como o Protocolo de Kyoto e o Acordo de Paris buscam unir países para conter o aquecimento global, definindo metas de redução de emissões de gases do efeito estufa.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual foi o principal objetivo estabelecido pelo Acordo de Paris em 2015?",
        opcoes: [
          "Banir completamente o uso de derivados de plástico até 2030",
          "Limitar o aumento da temperatura global a menos de 2°C",
          "Criar uma moeda global única vinculada a créditos de carbono",
          "Eliminar o uso de energia nuclear em todos os países membros"
        ],
        resposta: 1
      },
      {
        tipo: "complete",
        texto: "O tratado internacional focado em mitigar o aquecimento global assinado em 2015 chama-se Acordo de ___.",
        resposta: "paris"
      },
      {
        tipo: "vf",
        texto: "O Protocolo de Kyoto foi o primeiro tratado a estipular metas vinculantes de redução de emissões para países desenvolvidos.",
        resposta: true
      }
    ]
  },
  {
    id: 3,
    titulo: "3. Economia Circular",
    explicacao:
      "Diferente da economia linear (extrair, produzir, descartar), a economia circular redesenha produtos e processos para reutilizar, reparar e reciclar materiais no ciclo produtivo.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual é a lógica fundamental do modelo de economia circular?",
        opcoes: [
          "Maximizar o volume de extração contínua de recursos minerais",
          "Incentivar o consumo acelerado e substituição rápida de bens",
          "Manter produtos e materiais em ciclo ativo pelo maior tempo",
          "Priorizar a incineração completa de resíduos sólidos urbanos"
        ],
        resposta: 2
      },
      {
        tipo: "vf",
        texto: "A economia circular visa eliminar a ideia de 'lixo', transformando resíduos em novos recursos.",
        resposta: true
      },
      {
        tipo: "complete",
        texto: "O modelo econômico tradicional baseado em extrair, fabricar e descartar é chamado de economia ___.",
        resposta: "linear"
      }
    ]
  },
  {
    id: 4,
    titulo: "4. Pegada de Carbono",
    explicacao:
      "A pegada de carbono mede a quantidade total de emissões de gases de efeito estufa produzidas direta ou indiretamente pelas atividades humanas.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual das seguintes ações contribui diretamente para a redução da pegada de carbono individual?",
        opcoes: [
          "Consumir preferencialmente produtos e insumos importados via frete aéreo",
          "Manter eletrodomésticos permanentemente em modo de espera (standby)",
          "Elevar significativamente o consumo diário individual de proteína bovina",
          "Usar transporte público ou bicicleta"
        ],
        resposta: 3
      },
      {
        tipo: "complete",
        texto: "A medição de gases de efeito estufa emitidos por uma pessoa, empresa ou produto é chamada de pegada de ___.",
        resposta: "carbono"
      },
      {
        tipo: "vf",
        texto: "O dióxido de carbono (CO₂) é o único gás contabilizado no cálculo da pegada de carbono.",
        resposta: false
      }
    ]
  },
  {
    id: 5,
    titulo: "5. Biodiversidade",
    explicacao:
      "Biodiversidade refere-se à variedade de vida no planeta, abrangendo ecossistemas, espécies e diversidade genética. A degradação de habitats é a sua principal ameaça.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual é apontada como a maior causa da perda acelerada de biodiversidade no mundo?",
        opcoes: [
          "Destruição de habitats",
          "Expansão monitorada do ecoturismo em áreas protegidas",
          "Desenvolvimento de pesquisas de mapeamento genético",
          "Implementação de parques para geração de energia eólica"
        ],
        resposta: 0
      },
      {
        tipo: "vf",
        texto: "A perda de uma única espécie em um ecossistema raramente afeta a teia alimentar local.",
        resposta: false
      },
      {
        tipo: "complete",
        texto: "A variedade de seres vivos e ecossistemas da Terra é chamada de ___.",
        resposta: "biodiversidade"
      }
    ]
  },
  {
    id: 6,
    titulo: "6. Oceanos e Ecossistemas Aquáticos",
    explicacao:
      "Os oceanos cobrem mais de 70% da Terra, regulam o clima e absorvem CO₂. Contudo, enfrentam severas ameaças como acidificação, microplásticos e pesca predatória.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "O que causa diretamente a acidificação dos oceanos?",
        opcoes: [
          "Vazamento ocasional de óleos de origem vegetal",
          "Absorção de CO₂ atmosférico",
          "Crescimento populacional descontrolado de microalgas marinhas",
          "Diminuição natural dos níveis de salinidade em zonas estuarinas"
        ],
        resposta: 1
      },
      {
        tipo: "complete",
        texto: "Pedaços microscópicos de sintéticos que poluem os oceanos são chamados de ___.",
        resposta: "microplásticos"
      },
      {
        tipo: "vf",
        texto: "Os oceanos absorvem grande parte do calor extra gerado pelas emissões de gases de efeito estufa.",
        resposta: true
      }
    ]
  },
  {
    id: 7,
    titulo: "7. Tecnologia Verde",
    explicacao:
      "Tecnologia verde (ou Cleantech) envolve inovações ambientais criadas para mitigar impactos ecossistêmicos, incluindo energias renováveis e eficiência energética.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual das opções é um exemplo direto de aplicação de tecnologia verde?",
        opcoes: [
          "Uso de termelétricas movidas a carvão mineral de alta extração",
          "Produção em massa de embalagens plásticas não biodegradáveis",
          "Painéis solares fotovoltaicos",
          "Utilização extensiva de lâmpadas incandescentes de filamento"
        ],
        resposta: 2
      },
      {
        tipo: "vf",
        texto: "A tecnologia verde foca exclusivamente em criar novas fontes de energia, sem se preocupar com eficiência energética.",
        resposta: false
      },
      {
        tipo: "complete",
        texto: "Fontes de energia que se regeneram naturalmente, como solar e eólica, são chamadas de energias ___.",
        resposta: "renováveis"
      }
    ]
  },
  {
    id: 8,
    titulo: "8. ESG nas Empresas",
    explicacao:
      "A sigla ESG (Environmental, Social, Governance) mede a sustentabilidade e o impacto ético de uma empresa em suas operações e governança.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "O que significa a letra 'S' na sigla ESG?",
        opcoes: [
          "Sustentabilidade corporativa e ambiental",
          "Segurança das operações patrimoniais",
          "Setor de investimento estratégico",
          "Social"
        ],
        resposta: 3
      },
      {
        tipo: "vf",
        texto: "A prática de divulgar falsas ações sustentáveis por uma empresa é conhecida como Greenwashing.",
        resposta: true
      },
      {
        tipo: "complete",
        texto: "A maquiagem verde praticada por empresas para parecerem sustentáveis chama-se ___.",
        resposta: "greenwashing"
      }
    ]
  },
  {
    id: 9,
    titulo: "9. Agricultura Sustentável",
    explicacao:
      "Trata-se do cultivo focado na produção de alimentos sem esgotar o solo, contaminar recursos hídricos ou comprometer a biodiversidade local.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Qual destas práticas favorece a saúde do solo na agricultura sustentável?",
        opcoes: [
          "Rotação de culturas",
          "Prática contínua de monocultura intensiva sem períodos de descanso",
          "Aplicação descontrolada de insumos e defensivos químicos sintéticos",
          "Queimada periódica do solo para remoção rápida de cobertura vegetal"
        ],
        resposta: 0
      },
      {
        tipo: "complete",
        texto: "A prática agrícola que alterna os tipos de plantas cultivadas na mesma área é a ___ de culturas.",
        resposta: "rotação"
      },
      {
        tipo: "vf",
        texto: "A agroecologia busca integrar o conhecimento tradicional com práticas ecológicas de cultivo.",
        resposta: true
      }
    ]
  },
  {
    id: 10,
    titulo: "10. Ativismo e Cidadania Ambiental",
    explicacao:
      "A cidadania ambiental reflete o papel ativo de indivíduos e comunidades na cobrança de políticas públicas, consumo consciente e engajamento comunitário.",
    perguntas: [
      {
        tipo: "multipla",
        texto: "Como o cidadão pode exercer diretamente a cidadania ambiental em sua rotina?",
        opcoes: [
          "Desconsiderar a origem e a sustentabilidade dos bens adquiridos",
          "Cobrar ações ecológicas dos governantes",
          "Realizar o descarte irracional de resíduos em áreas não autorizadas",
          "Estimular o aumento do consumo individual desnecessário"
        ],
        resposta: 1
      },
      {
        tipo: "vf",
        texto: "A mobilização jovem tem sido um dos motores globais nas marchas do clima e cobrança aos governos.",
        resposta: true
      },
      {
        tipo: "complete",
        texto: "A ação de considerar o impacto socioambiental de um produto antes de comprá-lo é chamada de consumo ___.",
        resposta: "consciente"
      }
    ]
  }
];

const letras = ["A", "B", "C", "D"];

// Algoritmo de Distância de Levenshtein para medir similaridade de texto
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

export default function CursoAvancado() {
  const [capituloIndex, setCapituloIndex] = useState(0);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [menuCapitulosAberto, setMenuCapitulosAberto] = useState(false);

  const totalPerguntas = capitulosAvancado.reduce((acc, cap) => acc + cap.perguntas.length, 0);
  const capituloAtual = capitulosAvancado[capituloIndex];
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
      } else if (capituloIndex + 1 < capitulosAvancado.length) {
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

    // Define tolerância com base na extensão do termo correto
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
          {capitulosAvancado.map((cap, idx) => {
            const ehAtual = idx === capituloIndex;
            return (
              <div
                key={cap.id}
                onClick={() => selecionarCapitulo(idx)}
                style={{
                  ...estilos.itemCapitulo,
                  background: ehAtual ? "#1a5c2a" : "rgba(0, 0, 0, 0.05)",
                  color: ehAtual ? "#ffffff" : "#000000",
                }}
              >
                {cap.titulo}
              </div>
            );
          })}
          <button onClick={() => setMenuCapitulosAberto(false)} style={estilos.botaoFecharModal}>Fechar</button>
        </div>
      )}

      <div style={estilos.caixaExplicacao}>
        <h3 style={{ fontSize: "20px", color: "#1a5c2a", marginBottom: "8px" }}>{capituloAtual.titulo}</h3>
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