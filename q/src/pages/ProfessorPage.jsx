"use client"

import { useEffect, useState } from "react"
import { Container, Button, Card, Row, Col, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { listarProfessores } from "../services/ProfessorService"

function ProfessorPage() {
  const [professores, setProfessores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    listarProfessores()
      .then((data) => {
        console.log("Professores recebidos:", data)
        setProfessores(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erro ao carregar professores:", err)
        setError("Falha ao carregar a lista de professores.")
        setProfessores([])
        setLoading(false)
      })
  }, [])

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Gerenciamento de Professores</h1>

      <Row className="justify-content-center mb-5">
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow">
            <Card.Body className="d-flex flex-column">
              <Card.Title>Cadastro de Professor</Card.Title>
              <Card.Text>Adicione um novo professor ao sistema universitário.</Card.Text>
              <Button variant="primary" className="mt-auto" onClick={() => navigate("/professor/cadastro")}>
                Cadastrar Novo Professor
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-4">Lista de Professores</h2>

      {loading ? (
        <p className="text-center">Carregando professores...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : professores.length === 0 ? (
        <p>Nenhum professor encontrado.</p>
      ) : (
        <Table responsive striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Departamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.id}>
                <td>{professor.id}</td>
                <td>{professor.nome}</td>
                <td>{professor.email}</td>
                <td>{professor.telefone}</td>
                <td>{professor.departamento}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/professor/editar/${professor.id}`)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => navigate("/")}>
          Voltar para Home
        </Button>
      </div>
    </Container>
  )
}

export default ProfessorPage
