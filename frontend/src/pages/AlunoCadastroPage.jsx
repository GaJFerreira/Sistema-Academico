"use client"

import { useState } from "react"
import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap"
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setIsSubmitting(true)
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
        setError(err.message || "Erro desconhecido ao cadastrar aluno. Tente novamente.")
        setSuccess(false)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Cadastro de Novo Aluno</h1>

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow custom-card">
              <Card.Header className="bg-primary text-white text-center py-3">
                <h2 className="mb-0 fs-4">Formulário de Cadastro</h2>
              </Card.Header>
              <Card.Body className="p-4">
                {success && (
                  <Alert variant="success" className="d-flex align-items-center">
                    <div className="me-3">
                      <i className="bi bi-check-circle-fill fs-4"></i>
                    </div>
                    <div>
                      <strong>Cadastro realizado com sucesso!</strong> Você será redirecionado para sua grade
                      curricular...
                    </div>
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger" className="d-flex align-items-center">
                    <div className="me-3">
                      <i className="bi bi-exclamation-triangle-fill fs-4"></i>
                    </div>
                    <div>
                      <strong>Erro!</strong> {error}
                    </div>
                  </Alert>
                )}

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
                      className="py-2"
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
                      className="py-2"
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
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe um email válido.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formCurso">
                    <Form.Label>Curso</Form.Label>
                    <Form.Select name="curso" value={formData.curso} onChange={handleChange} required className="py-2">
                      <option value="">Selecione um curso</option>
                      <option value="Engenharia de Software">Engenharia de Software</option>
                      <option value="Ciência da Computação">Ciência da Computação</option>
                      <option value="Sistemas de Informação">Sistemas de Informação</option>
                      <option value="Análise e Desenvolvimento de Sistemas">
                        Análise e Desenvolvimento de Sistemas
                      </option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Por favor, selecione um curso.</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" size="lg" disabled={isSubmitting} className="py-2">
                      {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                    <Button variant="outline-secondary" onClick={() => navigate("/aluno")} className="py-2">
                      Voltar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default AlunoCadastroPage
