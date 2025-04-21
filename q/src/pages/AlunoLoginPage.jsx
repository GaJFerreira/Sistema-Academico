"use client"

import { useState } from "react"
import { Form, Button, Card, Container, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { login } from "../services/alunoService"

function AlunoLoginPage() {
  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
  })

  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    const aluno = await login(formData.nome, formData.matricula)

    console.log("Dados para login:", formData)
    console.log("Aluno encontrado:", aluno)

    if (!aluno) {
      setError("Nome ou matrícula inválidos.")
    } else {
      localStorage.setItem("matricula", formData.matricula)
      localStorage.setItem("nome", formData.nome)
      navigate("/aluno/grade")
    }
  }

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="bg-success text-white">
          <h2 className="mb-0">Login de Aluno</h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome"
                required
              />
              <Form.Control.Feedback type="invalid">Por favor, informe seu nome.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMatricula">
              <Form.Label>Matrícula</Form.Label>
              <Form.Control
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                placeholder="Digite sua matrícula"
                required
              />
              <Form.Control.Feedback type="invalid">Por favor, informe sua matrícula.</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate("/aluno")}>
                Voltar
              </Button>
              <Button variant="success" type="submit">
                Entrar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AlunoLoginPage
