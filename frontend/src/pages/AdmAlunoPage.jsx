"use client"

import { useEffect, useState } from "react"
import { Container, Button, Card, Row, Col, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { listarAlunos } from "../services/alunoService"

function AlunoPage() {
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    listarAlunos()
      .then((data) => {
        console.log("Dados recebidos:", data)
        setAlunos(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erro:", err)
        setError("Não foi possível carregar a lista de alunos.")
        setAlunos([])
        setLoading(false)
      })
  }, [])

  const handleLogin = () => {
    if (localStorage.length == 0) {
      navigate("/aluno/login")
    } else {
      navigate("/aluno/grade")
    }
  }

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Área do Aluno</h1>

        <Row className="justify-content-center mb-5">
          <Col md={5} className="mb-4">
            <Card className="h-100 custom-card">
              <Card.Header className="bg-primary text-white text-center py-3">Novo Aluno</Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Cadastro de Aluno</Card.Title>
                <Card.Text className="mb-4">
                  Novo por aqui? Faça seu cadastro para acessar o sistema universitário e começar sua jornada acadêmica.
                </Card.Text>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-auto w-100"
                  onClick={() => navigate("/aluno/cadastro")}
                >
                  Cadastrar
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5} className="mb-4">
            <Card className="h-100 custom-card">
              <Card.Header className="bg-success text-white text-center py-3">Aluno Existente</Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Login de Aluno</Card.Title>
                <Card.Text className="mb-4">
                  Já possui cadastro? Faça login com seu nome e matrícula para acessar sua grade curricular e
                  informações acadêmicas.
                </Card.Text>
                <Button variant="success" size="lg" className="mt-auto w-100" onClick={() => handleLogin()}>
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="bg-light p-4 rounded shadow-sm">
          <h2 className="text-dark mb-4">Lista de Alunos</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="mt-2 text-dark">Carregando lista de alunos...</p>
            </div>
          ) : alunos.length === 0 ? (
            <Alert variant="info">Nenhum aluno encontrado no sistema.</Alert>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Matrícula</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr key={aluno.id}>
                      <td>{aluno.id}</td>
                      <td>{aluno.nome}</td>
                      <td>{aluno.matricula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            Voltar para Home
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default AlunoPage
y