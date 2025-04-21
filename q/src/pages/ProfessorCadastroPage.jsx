"use client"

import { useState } from "react"
import { Form, Button, Card, Container, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { cadastrarProfessor } from "../services/ProfessorService"

function ProfessorCadastroPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    departamento: "",
    titulacao: "",
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
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    cadastrarProfessor(formData)
      .then((res) => {
        setSuccess(true)
        setError("")
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          departamento: "",
          titulacao: "",
        })
        setValidated(false)

        setTimeout(() => {
          navigate("/professor")
        }, 2000)
      })
      .catch((err) => {
        setError(err.message || "Erro ao cadastrar professor")
        setSuccess(false)
      })
  }

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">Cadastro de Professor</h2>
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
                placeholder="Digite o nome completo"
                required
              />
              <Form.Control.Feedback type="invalid">Por favor, informe o nome completo.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@exemplo.com"
                required
              />
              <Form.Control.Feedback type="invalid">Por favor, informe um email válido.</Form.Control.Feedback>
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

            <Form.Group className="mb-3" controlId="formDepartamento">
              <Form.Label>Departamento</Form.Label>
              <Form.Select name="departamento" value={formData.departamento} onChange={handleChange} required>
                <option value="">Selecione um departamento</option>
                <option value="Ciências da Computação">Ciências da Computação</option>
                <option value="Engenharia">Engenharia</option>
                <option value="Matemática">Matemática</option>
                <option value="Física">Física</option>
                <option value="Letras">Letras</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, selecione um departamento.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitulacao">
              <Form.Label>Titulação</Form.Label>
              <Form.Select name="titulacao" value={formData.titulacao} onChange={handleChange} required>
                <option value="">Selecione uma titulação</option>
                <option value="Graduação">Graduação</option>
                <option value="Especialização">Especialização</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado">Doutorado</option>
                <option value="Pós-Doutorado">Pós-Doutorado</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, selecione uma titulação.</Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate("/professor")}>
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

export default ProfessorCadastroPage
