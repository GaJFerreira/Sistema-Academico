const API_URL = "http://localhost:8080/api/grades"

export async function listarGrades() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Erro ao listar alunos")
  return res.json()
}

export async function buscarGradeMatricula(matricula) {
  const res = await fetch(`http://localhost:8080/api/grades/aluno/${matricula}`)
  if (!res.ok) throw new Error("Erro ao buscar grade")
  return res.json()
}

export async function buscarGradePorAluno(id) {
  const res = await fetch(`http://localhost:8080/api/grades/aluno/${id}`)
  if (!res.ok) throw new Error("Erro ao buscar grade")
  return res.json()
}


export async function salvarGradeAluno(dados) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados), // Envia os dados como JSON
    });

    if (!response.ok) {
      const erro = await response.text();
      throw new Error(erro || "Erro ao cadastrar grade");
    }

    return await response.json(); // Retorna a resposta do servidor
  } catch (erro) {
    console.error("Erro ao salvar grade:", erro);
    throw erro; // Re-lança o erro para ser tratado pelo chamador
  }
}

