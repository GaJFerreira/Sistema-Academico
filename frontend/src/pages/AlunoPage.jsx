"use client"

import { useEffect, useState } from "react"
import { Container, Button, Card, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { listarAlunos } from "../services/alunoService"

function AlunoPage() {
  const [alunos, setAlunos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    listarAlunos()
      .then((data) => {
        console.log("Dados recebidos:", data)
        setAlunos(data)
      })
      .catch((err) => {
        console.error("Erro:", err)
        setAlunos([])
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
    <Container className="mt-5">
      <h1 className="text-center mb-4">Área do Aluno</h1>

      <Row className="justify-content-center mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Cadastro de Aluno</Card.Title>
              <Card.Text>Novo por aqui? Faça seu cadastro para acessar o sistema universitário.</Card.Text>
              <Button variant="primary" className="mt-auto" onClick={() => navigate("/aluno/cadastro")}>
                Cadastrar
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Login de Aluno</Card.Title>
              <Card.Text>Já possui cadastro? Faça login com seu nome e matrícula.</Card.Text>
              <Button variant="success" className="mt-auto" onClick={() => handleLogin()}>
                Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-4">Lista de Alunos</h2>
      {alunos.length === 0 ? (
        <p>Nenhum aluno encontrado.</p>
      ) : (
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
      )}

      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Voltar para Home
        </Button>
      </div>
    </Container>
  )
}

export default AlunoPage
