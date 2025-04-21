"use client"

import { useState } from "react"
import { Form, Button, Card, Container, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { cadastrarAluno } from "../services/alunoService"

// Função para gerar matrícula única
function gerarMatricula() {
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

function AlunoCadastroPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    telefone: "",
    email: "",
    curso: "",
    p: "",
  })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const matriculaGerada = gerarMatricula()

    const aluno = {
      ...formData,
      matricula: matriculaGerada,
      periodo: 1,
    }

    cadastrarAluno(aluno)
      .then((res) => {
        setSuccess(true)
        setError("")

        // Salvar no localStorage para reutilizar em outras telas
        localStorage.setItem("matricula", aluno.matricula)
        localStorage.setItem("nome", aluno.nome)

        setFormData({
          nome: "",
          matricula: "",
          telefone: "",
          email: "",
          curso: "",
          periodo: "",
        })
        setValidated(false)

        setTimeout(() => {
          navigate("/aluno/grade")
        }, 2000)
      })
      .catch((err) => {
        setError(err.message || "Erro desconhecido")
        setSuccess(false)
      })
  }

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">Cadastro de Aluno</h2>
        </Card.Header>
        <Card.Body>
          {success && <Alert variant="success">Cadastro realizado com sucesso! Redirecionando...</Alert>}

          {error && <Alert variant="danger">{error}</Alert>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                required
              />
              <Form.Control.Feedback type="invalid">Por favor, informe seu nome completo.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
              />
              <Form.Control.Feedback type="invalid">Por favor, informe um telefone válido.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu.email@exemplo.com"
                required
              />
              <Form.Control.Feedback type="invalid">Por favor, informe um email válido.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCurso">
              <Form.Label>Curso</Form.Label>
              <Form.Select name="curso" value={formData.curso} onChange={handleChange} required>
                <option value="">Selecione um curso</option>
                <option value="Engenharia de Software">Engenharia de Software</option>
                <option value="Ciência da Computação">Ciência da Computação</option>
                <option value="Sistemas de Informação">Sistemas de Informação</option>
                <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, selecione um curso.</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate("/aluno")}>
                Voltar
              </Button>
              <Button variant="primary" type="submit">
                Cadastrar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AlunoCadastroPage
