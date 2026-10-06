const CHAVE = "terrametric_progresso_cursos";

const lerTudo = () => {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) || {};
  } catch {
    return {};
  }
};

const salvarTudo = (dados) => {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch {
    // localStorage indisponível (modo privado, etc.) — progresso não é persistido, mas o curso continua funcionando.
  }
};

/**
 * Registra o progresso de um curso. Guarda sempre o "melhor" estado já
 * alcançado (mais perguntas respondidas, mais acertos, ou já concluído),
 * para que reiniciar um curso não faça a barra de progresso regredir.
 */
export const salvarProgressoCurso = (cursoId, { perguntasRespondidas, totalPerguntas, concluido = false, acertos = 0 }) => {
  const tudo = lerTudo();
  const atual = tudo[cursoId] || { perguntasRespondidas: 0, melhorAcertos: 0, concluido: false };
  tudo[cursoId] = {
    perguntasRespondidas: Math.max(perguntasRespondidas, atual.perguntasRespondidas || 0),
    totalPerguntas,
    concluido: concluido || atual.concluido || false,
    melhorAcertos: Math.max(acertos, atual.melhorAcertos || 0),
  };
  salvarTudo(tudo);
};

export const lerProgressoCurso = (cursoId) => lerTudo()[cursoId] || null;

export const lerTodoProgresso = () => lerTudo();