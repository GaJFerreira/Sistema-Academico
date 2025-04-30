"use client"

import { useEffect, useState } from "react"
import { Button, Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap"
import { listarDisciplinas, cadastrarDsiciplina } from "../services/disciplinaService"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

function DisciplinaPage() {
  const [disciplinas, setDisciplinas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: "",
    cargaHoraria: "",
    periodo: "",
    areaDeEstudo: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = (e) => {
    if (!formData.nome || !formData.cargaHoraria || !formData.periodo) {
      setError("Preencha os campos obrigatórios")
      return
    }

    setLoading(true)
    cadastrarDsiciplina(formData)
      .then((response) => {
        console.log("Disciplina cadastrada com sucesso!", response)
        setSuccess("Disciplina cadastrada com sucesso!")
        setFormData({
          nome: "",
          cargaHoraria: "",
          periodo: "",
          areaDeEstudo: "",
        })

        // Recarregar a lista de disciplinas
        listarDisciplinas().then((data) => {
          setDisciplinas(data)
          setLoading(false)
        })
      })
      .catch((err) => {
        console.error("Erro ao cadastrar disciplina:", err)
        setError("Erro ao cadastrar disciplina. Tente novamente.")
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    listarDisciplinas()
      .then((data) => {
        setDisciplinas(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erro:", err)
        setError("Erro ao carregar disciplinas")
        setDisciplinas([])
        setLoading(false)
      })
  }, [])

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Gerenciamento de Disciplinas</h1>

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
                      <Card.Text>Cadastrar nova disciplina no sistema</Card.Text>
                      <Button variant="primary" className="w-100" data-bs-toggle="modal" data-bs-target="#cadastro">
                        <i className="bi bi-journal-plus me-2"></i>
                        Cadastrar
                      </Button>
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-3">
                  <Card className="border-secondary">
                    <Card.Body>
                      <Card.Title>Editar</Card.Title>
                      <Card.Text>Editar cadastro de disciplina existente</Card.Text>
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
                <h3 className="mb-0 fs-5">Lista de Disciplinas</h3>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Carregando disciplinas...</p>
                  </div>
                ) : disciplinas.length === 0 ? (
                  <Alert variant="info" className="text-center mb-0">
                    <i className="bi bi-info-circle-fill fs-4 mb-3 d-block"></i>
                    <h5>Nenhuma disciplina encontrada</h5>
                    <p className="mb-0">Clique em "Cadastrar" para adicionar uma nova disciplina.</p>
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Nome</th>
                          <th scope="col">Carga Horária</th>
                          <th scope="col">Período</th>
                          <th scope="col">Área de Estudo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {disciplinas.map((disciplina) => (
                          <tr key={disciplina.id}>
                            <td>{disciplina.id}</td>
                            <td>{disciplina.nome}</td>
                            <td>{disciplina.cargaHoraria}</td>
                            <td>{disciplina.periodo}</td>
                            <td>{disciplina.areaDeEstudo || "-"}</td>
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

        {/* Modal para cadastro de disciplina */}
        <div className="modal fade" id="cadastro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Cadastro de Disciplina
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome da Disciplina
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: Cálculo I, Programação Orientada a Objetos"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cargaHoraria" className="form-label">
                    Carga Horária
                  </label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    id="cargaHoraria"
                    name="cargaHoraria"
                    value={formData.cargaHoraria}
                    onChange={handleChange}
                    placeholder="Ex: 60, 80, 120"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="periodo" className="form-label">
                    Período
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="periodo"
                    name="periodo"
                    value={formData.periodo}
                    onChange={handleChange}
                    placeholder="Ex: 1, 2, 3"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="areaDeEstudo" className="form-label">
                    Área de Estudo
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="areaDeEstudo"
                    name="areaDeEstudo"
                    value={formData.areaDeEstudo}
                    onChange={handleChange}
                    placeholder="Ex: Exatas, Humanas, Tecnologia"
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

export default DisciplinaPage
