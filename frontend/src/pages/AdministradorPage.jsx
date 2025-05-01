"use client"
import "../estilos/EstiloGeral.css"
import { Button, Container, Row, Col, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function AdministradorPage() {
  const navigate = useNavigate()

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Painel do Administrador</h1>
        <h2 className="text-center mb-4">Gerenciamento do Sistema</h2>

        <Row className="g-4">
          <Col lg={6} md={6} sm={12}>
            <Card className="h-100 shadow custom-card">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Gerenciar Professores</h3>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Corpo Docente</Card.Title>
                <Card.Text className="mb-4">
                  Realize o cadastro, edição e gerenciamento dos professores da instituição. Mantenha o registro de
                  formação e especialização atualizado.
                </Card.Text>
                <div className="mt-auto text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4"
                    onClick={() => navigate("/administrador/professor")}
                  >
                    <i className="bi bi-person-badge me-2"></i>
                    Acessar Professores
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Card className="h-100 shadow custom-card">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Gerenciar Salas</h3>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Infraestrutura</Card.Title>
                <Card.Text className="mb-4">
                  Faça o cadastro, edição e gerenciamento das salas de aula. Organize as salas por área, bloco e número
                  para facilitar a localização.
                </Card.Text>
                <div className="mt-auto text-center">
                  <Button variant="primary" size="lg" className="px-4" onClick={() => navigate("/administrador/sala")}>
                    <i className="bi bi-building me-2"></i>
                    Acessar Salas
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Card className="h-100 shadow custom-card">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Gerenciar Disciplinas</h3>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Grade Curricular</Card.Title>
                <Card.Text className="mb-4">
                  Realize o cadastro, edição e gerenciamento das disciplinas oferecidas. Defina carga horária, período e
                  área de estudo para cada disciplina.
                </Card.Text>
                <div className="mt-auto text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4"
                    onClick={() => navigate("/administrador/disciplina")}
                  >
                    <i className="bi bi-book me-2"></i>
                    Acessar Disciplinas
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} md={6} sm={12}>
            <Card className="h-100 shadow custom-card">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Gerenciar Alunos</h3>
              </Card.Header>
              <Card.Body className="d-flex flex-column">
                <Card.Title>Corpo Discente</Card.Title>
                <Card.Text className="mb-4">
                  Faça o cadastro, edição e gerenciamento dos alunos matriculados. Acompanhe o progresso acadêmico e
                  gerencie as matrículas.
                </Card.Text>
                <div className="mt-auto text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-4"
                    onClick={() => navigate("/administrador/aluno")}
                  >
                    <i className="bi bi-people me-2"></i>
                    Acessar Alunos
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="secondary" size="lg" onClick={() => navigate("/")}>
            <i className="bi bi-house-door me-2"></i>
            Voltar para Home
          </Button>
        </div>
      </div>
    </Container>
  )
}

export default AdministradorPage
