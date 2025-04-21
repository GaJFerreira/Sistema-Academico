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
