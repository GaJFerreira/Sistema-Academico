const API_URL = "http://localhost:8080/api/disciplinas"

export async function listarDisciplinas() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Erro ao listar disciplinas")
  return res.json()
}
