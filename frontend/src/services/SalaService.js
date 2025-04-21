const API_URL = "http://localhost:8080/api/salas"

export async function listarSalas() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Erro ao listar salas")
  return res.json()
}

export async function buscarSalaPorId(id) {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error("Erro ao buscar sala")
  return res.json()
}

export async function cadastrarSala(dados) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao cadastrar sala")
  }

  return await response.json()
}

export async function atualizarSala(id, dados) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao atualizar sala")
  }

  return await response.json()
}

export async function excluirSala(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao excluir sala")
  }

  return true
}
