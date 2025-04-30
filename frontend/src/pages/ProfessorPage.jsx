"use client"

import { useEffect, useState } from "react"
import { Button, Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { listarProfessores, cadastrarProfessor } from "../services/ProfessorService"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

function ProfessorPage() {
  const [professores, setProfessores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: "",
    formacao: "",
    especializacao: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = (e) => {
    if (!formData.nome || !formData.formacao) {
      setError("Preencha os campos obrigatórios")
      return
    }

    setLoading(true)
    cadastrarProfessor(formData)
      .then((response) => {
        console.log("Professor cadastrado com sucesso!", response)
        setSuccess("Professor cadastrado com sucesso!")
        setFormData({
          nome: "",
          formacao: "",
          especializacao: "",
        })

        // Recarregar a lista de professores
        listarProfessores().then((data) => {
          setProfessores(data)
          setLoading(false)
        })
      })
      .catch((err) => {
        console.error("Erro ao cadastrar professor:", err)
        setError("Erro ao cadastrar professor. Tente novamente.")
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    listarProfessores()
      .then((data) => {
        setProfessores(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erro:", err)
        setError("Erro ao carregar professores")
        setProfessores([])
        setLoading(false)
      })
  }, [])

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Gerenciamento de Professores</h1>

        {error && (
          <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-4" onClose={() => setSuccess(null)} dismissible>
            <i className="bi bi-check-circle-fill me-2"></i>
            {success}
          </Alert>
        )}

        <Row>
          <Col lg={4} md={5} className="mb-4">
            <Card className="shadow custom-card">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Opções</h3>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <Card className="border-primary">
                    <Card.Body>
                      <Card.Title>Cadastrar</Card.Title>
                      <Card.Text>Cadastrar novo professor no sistema</Card.Text>
                      <Button variant="primary" className="w-100" data-bs-toggle="modal" data-bs-target="#cadastro">
                        <i className="bi bi-person-plus me-2"></i>
                        Cadastrar
                      </Button>
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-3">
                  <Card className="border-secondary">
                    <Card.Body>
                      <Card.Title>Editar</Card.Title>
                      <Card.Text>Editar cadastro de professor existente</Card.Text>
                      <Button variant="secondary" className="w-100" onClick={() => navigate("/administrador")}>
                        <i className="bi bi-pencil-square me-2"></i>
                        Editar
                      </Button>
                    </Card.Body>
                  </Card>
                </div>

                <div className="text-center mt-4">
                  <Button variant="outline-secondary" onClick={() => navigate("/administrador")}>
                    <i className="bi bi-arrow-left me-2"></i>
                    Voltar ao Painel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8} md={7}>
            <Card className="shadow custom-card">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Lista de Professores</h3>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Carregando professores...</p>
                  </div>
                ) : professores.length === 0 ? (
                  <Alert variant="info" className="text-center mb-0">
                    <i className="bi bi-info-circle-fill fs-4 mb-3 d-block"></i>
                    <h5>Nenhum professor encontrado</h5>
                    <p className="mb-0">Clique em "Cadastrar" para adicionar um novo professor.</p>
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Nome</th>
                          <th scope="col">Formação</th>
                          <th scope="col">Especialização</th>
                        </tr>
                      </thead>
                      <tbody>
                        {professores.map((professor) => (
                          <tr key={professor.id}>
                            <td>{professor.id}</td>
                            <td>{professor.nome}</td>
                            <td>{professor.formacao}</td>
                            <td>{professor.especializacao || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal para cadastro de professor */}
        <div className="modal fade" id="cadastro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Cadastro de Professor
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome completo do professor"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="formacao" className="form-label">
                    Formação
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="formacao"
                    name="formacao"
                    value={formData.formacao}
                    onChange={handleChange}
                    placeholder="Ex: Doutorado em Ciência da Computação"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="especializacao" className="form-label">
                    Especialização
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="especializacao"
                    name="especializacao"
                    value={formData.especializacao}
                    onChange={handleChange}
                    placeholder="Ex: Inteligência Artificial"
                  />
                  <div className="form-text">Campo opcional</div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancelar
                </button>

                <button type="button" className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal">
                  <i className="bi bi-save me-2"></i>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProfessorPage
