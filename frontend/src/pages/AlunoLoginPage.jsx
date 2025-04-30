"use client"

import { useState } from "react"
import { Form, Button, Card, Container, Alert, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { login } from "../services/alunoService"

function AlunoLoginPage() {
  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
  })

  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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

    setIsLoading(true)
    setError("")

    try {
      const aluno = await login(formData.nome, formData.matricula)

      console.log("Dados para login:", formData)
      console.log("Aluno encontrado:", aluno)

      if (!aluno) {
        setError("Nome ou matrícula inválidos. Verifique seus dados e tente novamente.")
      } else {
        localStorage.setItem("matricula", formData.matricula)
        localStorage.setItem("nome", formData.nome)
        navigate("/aluno/grade")
      }
    } catch (err) {
      setError("Erro ao realizar login. Por favor, tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Login de Aluno</h1>

        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <Card className="shadow custom-card">
              <Card.Header className="bg-success text-white text-center py-3">
                <h2 className="mb-0 fs-4">Acesso ao Sistema</h2>
              </Card.Header>
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Digite seu nome"
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe seu nome.</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formMatricula">
                    <Form.Label>Matrícula</Form.Label>
                    <Form.Control
                      type="text"
                      name="matricula"
                      value={formData.matricula}
                      onChange={handleChange}
                      placeholder="Digite sua matrícula"
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">Por favor, informe sua matrícula.</Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button variant="success" type="submit" size="lg" disabled={isLoading} className="py-2">
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Entrando...
                        </>
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                    <Button variant="outline-secondary" onClick={() => navigate("/aluno")} className="py-2">
                      Voltar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center py-3 bg-light">
                <span className="text-muted">Não tem cadastro? </span>
                <Button variant="link" className="p-0 border-0" onClick={() => navigate("/aluno/cadastro")}>
                  Cadastre-se aqui
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default AlunoLoginPage
