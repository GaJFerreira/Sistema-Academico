const API_URL = "http://localhost:8080/api/professores"

export async function listarProfessores() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Erro ao listar professores")
  return res.json()
}

export async function buscarProfessorPorId(id) {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error("Erro ao buscar professor")
  return res.json()
}

export async function cadastrarProfessor(dados) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao cadastrar professor")
  }

  return await response.json()
}

export async function atualizarProfessor(id, dados) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })

  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao atualizar professor")
  }

  return await response.json()
}

export async function excluirProfessor(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao excluir professor")
  }

  return true
}
