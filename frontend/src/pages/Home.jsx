"use client"
import { Button, Container, Row, Col, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../estilos/EstiloGeral.css"

function HomePage() {
  const navigate = useNavigate()

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="text-center content-container w-100">
        <h1 className="mb-4">Bem-vindo ao Sistema Universitário</h1>
        <h2 className="mb-4">Escolha uma opção de entrada</h2>

        <Row className="justify-content-center">
          <Col sm={6} md={5} className="mb-4">
            <Card className="h-100 custom-card">
              <Card.Header className="text-center py-3">Administrador</Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Área Administrativa</Card.Title>
                <Card.Text className="mb-4">
                  Acesse o painel de controle para gerenciar professores, salas, disciplinas e alunos.
                </Card.Text>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-auto w-100"
                  onClick={() => navigate("/administrador")}
                >
                  Entrar como Administrador
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} md={5} className="mb-4">
            <Card className="h-100 custom-card">
              <Card.Header className="text-center py-3 bg-success">Aluno</Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Portal do Aluno</Card.Title>
                <Card.Text className="mb-4">
                  Acesse sua grade curricular, faça matrícula em disciplinas e acompanhe seu progresso acadêmico.
                </Card.Text>
                <Button variant="success" size="lg" className="mt-auto w-100" onClick={() => navigate("/aluno")}>
                  Entrar como Aluno
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default HomePage
