const API_URL = "http://localhost:8080/api/disciplinas"

export async function listarDisciplinas() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Erro ao listar disciplinas")
  return res.json()
}

export async function cadastrarDsiciplina(dados) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao cadastrar dsisciplina")
  }

  return await response.json()
}