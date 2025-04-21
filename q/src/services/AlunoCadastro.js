const API_URL = "http://localhost:8080/api/alunos";

export async function cadastrarAluno(dados) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      })
      if (!response.ok) {
        const erro = await response.text()
        throw new Error(erro || "Erro ao cadastrar aluno")
      }

      return await response.json()
}

export async function gerarMatricula() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    const segundo = String(agora.getSeconds()).padStart(2, '0');
    const aleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
    return `${ano}${mes}${dia}${hora}${minuto}${segundo}${aleatorio}`;
  }
  