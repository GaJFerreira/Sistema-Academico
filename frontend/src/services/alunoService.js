const API_URL = "http://localhost:8080/api/alunos"

export async function listarAlunos() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Erro ao listar alunos")
  return res.json()
}

export async function buscAlunoMatricula(matricula) {
  const res = await fetch(`http://localhost:8080/api/alunos/${matricula}`)
  if (!res.ok) throw new Error("Erro ao buscar aluno")
  return res.json()
}

export async function login(nome, matricula) {
  const res = await fetch(`http://localhost:8080/api/alunos/login/${nome}/${matricula}`)
  if (!res.ok) {
    throw new Error("Erro ao fazer login")
  }

  try {
    const aluno = await res.json() // Aqui esperamos um JSON válido
    return aluno // Retornamos o aluno ou null se não encontrado
  } catch (error) {
    console.error("Erro ao processar a resposta da API:", error)
    throw new Error("Erro ao processar dados do aluno")
  }
}

// alunoService.js
export async function salvarAluno(aluno) {
  const response = await fetch(`http://localhost:8080/api/alunos/${aluno.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(aluno),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar aluno");
  }

  return await response.json();
}


export async function cadastrarAluno(dados) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
  if (!response.ok) {
    const erro = await response.text()
    throw new Error(erro || "Erro ao cadastrar aluno")
  }

  return await response.json()
}

export async function gerarMatricula() {
  const agora = new Date()
  const ano = agora.getFullYear()
  const mes = String(agora.getMonth() + 1).padStart(2, "0")
  const dia = String(agora.getDate()).padStart(2, "0")
  const hora = String(agora.getHours()).padStart(2, "0")
  const minuto = String(agora.getMinutes()).padStart(2, "0")
  const segundo = String(agora.getSeconds()).padStart(2, "0")
  const aleatorio = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")

  return `${ano}${mes}${dia}${hora}${minuto}${segundo}${aleatorio}`
}
