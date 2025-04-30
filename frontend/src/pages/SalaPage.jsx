"use client"

import { useEffect, useState } from "react"
import { Button, Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap"
import { listarSalas, cadastrarSala } from "../services/SalaService"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"

function SalaPage() {
  const [salas, setSalas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    area: "",
    bloco: "",
    numero: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSave = (e) => {
    if (!formData.area || !formData.bloco || !formData.numero) {
      setError("Preencha todos os campos obrigatórios")
      return
    }

    setLoading(true)
    cadastrarSala(formData)
      .then((response) => {
        console.log("Sala cadastrada com sucesso!", response)
        setSuccess("Sala cadastrada com sucesso!")
        setFormData({
          area: "",
          bloco: "",
          numero: "",
        })

        // Recarregar a lista de salas
        listarSalas().then((data) => {
          setSalas(data)
          setLoading(false)
        })
      })
      .catch((err) => {
        console.error("Erro ao cadastrar sala:", err)
        setError("Erro ao cadastrar sala. Tente novamente.")
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    listarSalas()
      .then((data) => {
        setSalas(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Erro:", err)
        setError("Erro ao carregar salas")
        setSalas([])
        setLoading(false)
      })
  }, [])

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Gerenciamento de Salas</h1>

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
                      <Card.Text>Cadastrar nova sala no sistema</Card.Text>
                      <Button variant="primary" className="w-100" data-bs-toggle="modal" data-bs-target="#cadastro">
                        <i className="bi bi-plus-square me-2"></i>
                        Cadastrar
                      </Button>
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-3">
                  <Card className="border-secondary">
                    <Card.Body>
                      <Card.Title>Editar</Card.Title>
                      <Card.Text>Editar cadastro de sala existente</Card.Text>
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
                <h3 className="mb-0 fs-5">Lista de Salas</h3>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Carregando salas...</p>
                  </div>
                ) : salas.length === 0 ? (
                  <Alert variant="info" className="text-center mb-0">
                    <i className="bi bi-info-circle-fill fs-4 mb-3 d-block"></i>
                    <h5>Nenhuma sala encontrada</h5>
                    <p className="mb-0">Clique em "Cadastrar" para adicionar uma nova sala.</p>
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Área</th>
                          <th scope="col">Bloco</th>
                          <th scope="col">Número</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salas.map((sala) => (
                          <tr key={sala.id}>
                            <td>{sala.id}</td>
                            <td>{sala.area}</td>
                            <td>{sala.bloco}</td>
                            <td>{sala.numero}</td>
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

        {/* Modal para cadastro de sala */}
        <div className="modal fade" id="cadastro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Cadastro de Sala
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="area" className="form-label">
                    Área
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Ex: Norte, Sul, Leste, Oeste"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="bloco" className="form-label">
                    Bloco
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="bloco"
                    name="bloco"
                    value={formData.bloco}
                    onChange={handleChange}
                    placeholder="Ex: A, B, C"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="numero" className="form-label">
                    Número
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    placeholder="Ex: 101, 102, 103"
                    required
                  />
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

export default SalaPage
