import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let ativo = true;

    const carregar = async () => {
      setCarregando(true);
      // getSession le a sessao local primeiro (rapido); getUser valida com o servidor.
      const { data: { user: usuarioAtual } } = await supabase.auth.getUser();
      if (!ativo) return;

      setUser(usuarioAtual);

      if (usuarioAtual) {
        const { data } = await supabase
          .from("resultados")
          .select("*")
          .eq("user_id", usuarioAtual.id)
          .order("created_at", { ascending: true });
        if (ativo) setResultados(data || []);
      } else {
        setResultados([]);
      }
      if (ativo) setCarregando(false);
    };

    carregar();

    // Mantem o dashboard sincronizado caso o usuario saia (ou a sessao expire)
    // em outra aba, ou apos o login/logout nesta mesma pagina.
    const { data: listener } = supabase.auth.onAuthStateChange((_evento, sessao) => {
      if (!sessao) {
        setUser(null);
        setResultados([]);
        setCarregando(false);
      } else {
        carregar();
      }
    });

    // Corrige o caso em que o navegador restaura a pagina do cache (bfcache)
    // ao usar o botao "Voltar" apos um logout, o que podia mostrar dados
    // antigos do usuario mesmo sem sessao ativa.
    const aoRestaurarPagina = (evento) => {
      if (evento.persisted) carregar();
    };
    window.addEventListener("pageshow", aoRestaurarPagina);

    return () => {
      ativo = false;
      listener?.subscription?.unsubscribe();
      window.removeEventListener("pageshow", aoRestaurarPagina);
    };
  }, []);

  if (carregando) return <div style={estilos.tela}><p style={{ color: "#4ade80" }}>Carregando...</p></div>;
  if (!user) return (
    <div style={estilos.tela}>
      <p style={{ color: "#f87171", fontSize: 18, marginBottom: 20 }}>Você precisa estar logado.</p>
      <button onClick={() => navigate("/loginsingup")} style={estilos.btn}>Fazer login</button>
    </div>
  );

  const totalQuizzes = resultados.length;
  const ultimo = totalQuizzes > 0 ? resultados[resultados.length - 1] : null;
  const ultimaPontuacao = ultimo?.pontos || 0;
  const melhorPontuacao = totalQuizzes > 0 ? Math.max(...resultados.map(r => r.pontos)) : 0;
  const total = ultimo?.total || 60;
  const mediaPct = totalQuizzes > 0
    ? Math.round(resultados.reduce((acc, r) => acc + (r.pontos / r.total) * 100, 0) / totalQuizzes)
    : 0;
  const ultimoPct = Math.round((ultimaPontuacao / total) * 100);

  const getNivel = (pct) => {
    if (pct >= 80) return { label: "Excelente", cor: "#4ade80" };
    if (pct >= 50) return { label: "Bom", cor: "#facc15" };
    return { label: "Em desenvolvimento", cor: "#f97316" };
  };

  const getCursoRecomendado = (pct) => {
    if (pct >= 80) return { label: "Curso Avançado", rota: "/curso-avancado", descricao: "Seu nível é excelente! Aprofunde seu conhecimento com o curso avançado.", cor: "#22c55e" };
    if (pct >= 50) return { label: "Curso Médio", rota: "/curso-medio", descricao: "Você já tem uma boa base! Continue evoluindo com o curso médio.", cor: "#0d9488" };
    return { label: "Curso Básico", rota: "/curso-basico", descricao: "Comece pelo básico para fortalecer seus hábitos sustentáveis.", cor: "#facc15" };
  };

  const nivel = getNivel(ultimoPct);
  const curso = getCursoRecomendado(ultimoPct);
  const ultimos = resultados.slice(-8);
  const barraMax = Math.max(...ultimos.map(r => r.pontos), 1);
  const formatarData = (iso) => new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  // Tópicos do último resultado
  const topicos = ultimo?.topicos || null;
  const topicosCores = {
    "Reciclagem": "#16a34a",
    "Plástico": "#0ea5e9",
    "Reutilização": "#8b5cf6",
    "Água": "#06b6d4",
    "Energia": "#f59e0b",
    "Consumo": "#ec4899",
    "Alimentos": "#84cc16",
    "Transporte": "#f97316",
    "Papel": "#a78bfa",
    "Lixo Eletrônico": "#ef4444",
    "Consciência": "#4ade80",
    "Engajamento": "#fbbf24",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1a3d20", padding: "28px 40px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700 }}>
          {(user.user_metadata?.name || user.email || "U")[0].toUpperCase()}
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{user.user_metadata?.name || "Usuário"}</h1>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{user.email}</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ background: "#052e16", border: "1px solid #16a34a", color: "#4ade80", padding: "6px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600 }}>
            {nivel.label}
          </div>
          <button onClick={async () => { await supabase.auth.signOut(); navigate("/loginsingup"); }} style={{ ...estilos.btn, background: "transparent", border: "1px solid #374151", color: "#9ca3af", fontSize: 13 }}>
            Sair
          </button>
        </div>
      </div>

      <div style={{ padding: "32px 40px" }}>

        {/* Último resultado */}
        {totalQuizzes > 0 && (
          <div style={{ background: "#111", border: "1px solid #1a3d20", borderRadius: 14, padding: "24px", marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 8px" }}>Último resultado</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: nivel.cor, margin: "0 0 4px" }}>{ultimoPct}%</p>
            <p style={{ fontSize: 14, color: "#a1a1aa", margin: 0 }}>
              {ultimoPct >= 80 ? "Excelente! Você é muito consciente ambientalmente." :
               ultimoPct >= 50 ? "Bom! Você tem bons hábitos, mas pode melhorar." :
               "Atenção! Há bastante espaço para melhorar seus hábitos."}
            </p>
            <button onClick={() => navigate("/questionario")} style={{ ...estilos.btn, marginTop: 16 }}>
              Refazer questionário
            </button>
          </div>
        )}

        {/* Desempenho por tópico */}
        {topicos && (
          <div style={{ background: "#111", border: "1px solid #1a3d20", borderRadius: 14, padding: "24px", marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px" }}>Desempenho por tópico — último questionário</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.entries(topicos).map(([nome, dados]) => {
                const pct = Math.round((dados.pontos / dados.total) * 100);
                const cor = topicosCores[nome] || "#16a34a";
                return (
                  <div key={nome}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#e5e7eb", fontWeight: 500 }}>{nome}</span>
                      <span style={{ fontSize: 12, color: cor, fontWeight: 700 }}>{dados.pontos}/{dados.total} pts — {pct}%</span>
                    </div>
                    <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: cor, borderRadius: 999, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sem tópicos (resultados antigos sem a coluna) */}
        {totalQuizzes > 0 && !topicos && (
          <div style={{ background: "#111", border: "1px solid #374151", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
              Refaça o questionário para ver seu desempenho por tópico.
            </p>
          </div>
        )}

        {/* Curso recomendado */}
        <div style={{ background: "#111", border: `1px solid ${curso.cor}40`, borderRadius: 14, padding: "24px", marginBottom: 24 }}>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 8px" }}>Curso recomendado para você</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: curso.cor, margin: "0 0 8px" }}>{curso.label}</p>
          <p style={{ fontSize: 14, color: "#a1a1aa", margin: "0 0 16px" }}>{curso.descricao}</p>
          <button onClick={() => navigate(curso.rota)} style={{ ...estilos.btn, background: curso.cor, color: "#000" }}>
            Iniciar {curso.label}
          </button>
        </div>

        {/* Cards de stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Quizzes feitos", valor: totalQuizzes },
            { label: "Última pontuação", valor: `${ultimaPontuacao}/${total}` },
            { label: "Melhor pontuação", valor: `${melhorPontuacao}/${total}` },
            { label: "Média geral", valor: `${mediaPct}%` },
          ].map((card, i) => (
            <div key={i} style={{ background: "#111", border: "1px solid #1a3d20", borderRadius: 14, padding: "20px 18px" }}>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px" }}>{card.label}</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#22c55e", margin: 0 }}>{card.valor}</p>
            </div>
          ))}
        </div>

        {/* Histórico */}
        <div style={{ background: "#111", border: "1px solid #1a3d20", borderRadius: 14, padding: "24px" }}>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px" }}>Histórico de pontuações</p>
          {totalQuizzes === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ color: "#374151", fontSize: 14, marginBottom: 16 }}>Nenhum quiz realizado ainda.</p>
              <button onClick={() => navigate("/questionario")} style={estilos.btn}>Fazer questionário</button>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 100 }}>
                {ultimos.map((r, i) => {
                  const altura = Math.round((r.pontos / barraMax) * 100);
                  const pct = Math.round((r.pontos / r.total) * 100);
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 10, color: "#22c55e" }}>{pct}%</span>
                      <div style={{ width: "100%", height: `${altura}%`, minHeight: 4, background: "#16a34a", borderRadius: "4px 4px 0 0" }} />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                {ultimos.map((r, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#4b5563" }}>{formatarData(r.created_at)}</div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

const estilos = {
  tela: { minHeight: "100vh", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" },
  btn: { padding: "10px 24px", borderRadius: 20, border: "none", background: "#16a34a", color: "white", fontSize: 14, cursor: "pointer", fontWeight: 600 },
};