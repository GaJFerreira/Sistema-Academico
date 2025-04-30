"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buscAlunoMatricula } from "../services/alunoService";
import { buscarGradeMatricula } from "../services/gradeService";
import { Button, Container, Row, Col, Card, Alert, Badge } from "react-bootstrap";
import { listarDisciplinas } from "../services/disciplinaService";
import { listarProfessores } from "../services/ProfessorService";
import { listarSalas } from "../services/SalaService"; // Serviço para listar salas
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { salvarAluno } from "../services/alunoService";

function AlunoGradePage() {
  const [aluno, setAluno] = useState(null);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedSala, setSelectedSala] = useState(null); // Estado para a sala escolhida
  const navigate = useNavigate();
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]); // Estado para as salas
  const [loading, setLoading] = useState(true);

  // Recupera a matrícula do localStorage
  const matricula = localStorage.getItem("matricula");

  // Carregar os dados do aluno, grades, disciplinas, professores e salas
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        if (matricula) {
          // Carregar dados do aluno
          const alunoData = await buscAlunoMatricula(matricula);
          setAluno({
            ...alunoData,
            grade: alunoData.grade || [], // Garantir que grades seja um array, mesmo se estiver indefinido
          });

          console.log("!Aluno:" , alunoData);

          // Carregar as grades do aluno
          const gradesData = await buscarGradeMatricula(matricula);
          setGrades(gradesData);

          // Carregar as disciplinas
          const disciplinasData = await listarDisciplinas();
          setDisciplinas(disciplinasData);

          // Carregar os professores
          const professoresData = await listarProfessores();
          setProfessores(professoresData);

          // Carregar as salas
          const salasData = await listarSalas();
          setSalas(salasData);
        } else {
          setError("Matrícula não encontrada. Faça login novamente.");
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matricula]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDisciplinaClick = (disciplina) => {
    setSelectedDisciplina(disciplina);
  };

  const handleProfessorChange = (e) => {
    const professorSelecionado = professores.find((p) => p.id == e.target.value);
    setSelectedProfessor(professorSelecionado);
  };

  const handleSalaChange = (e) => {
    const salaSelecionada = salas.find((s) => s.id == e.target.value);
    setSelectedSala(salaSelecionada);
  };

  const handleAddDisciplina = () => {
    if (!selectedDisciplina || !selectedProfessor || !selectedSala) {
      setError("Por favor, selecione uma disciplina, um professor e uma sala.");
      return;
    }

    // Criar a nova grade com os dados selecionados
    const novaGrade = {
      disciplina: selectedDisciplina.id,
      professor: selectedProfessor.id,
      sala: selectedSala.id,
      status: "Matriculado", // O status pode ser 'Matriculado', 'Aguardando', etc.
    };

    console.log("nove grade: ", novaGrade)

    // Adicionar a nova grade ao array de grades do aluno
    const alunoAtualizado = {
      ...aluno, // Mantém as outras propriedades do aluno
      grade: aluno.grade ? [...aluno.grade, novaGrade] : [novaGrade], // Se grades estiver indefinido, inicializa como um array com a nova grade
    };

    console.log("ALUINO:  ", aluno)
  
    // Enviar o aluno atualizado de volta para o backend
    salvarAluno(aluno.id, alunoAtualizado)
      .then((response) => {
        console.log("Aluno atualizado com sucesso:", response);

        // Atualizar a lista de grades localmente
        setGrades((prevGrades) => [...prevGrades, novaGrade]);

        // Fechar o modal
        setShowModal(false);
        setSelectedDisciplina(null);
        setSelectedProfessor(null);
        setSelectedSala(null); // Limpar seleção de sala
      })
      .catch((err) => {
        console.error("Erro ao salvar aluno:", err);
        setError("Erro ao salvar aluno.");
      });
  };

  const handleHome = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center content-container p-5">
          <div className="spinner-border text-light" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Carregando...</span>
          </div>
          <h3 className="mt-3">Carregando dados do aluno...</h3>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="content-container">
        <h1 className="text-center mb-4">Área do Aluno</h1>

        {error && (
          <Alert variant="danger" className="mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        <Row>
          <Col lg={4} md={5} className="mb-4">
            <Card className="shadow custom-card h-100">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Dados do Aluno</h3>
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item py-3">
                    <strong>Nome:</strong> {aluno?.nome || "Não disponível"}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Matricula:</strong> {aluno?.matricula || "Não disponível"}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Email:</strong> {aluno?.email || "Não disponível"}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Telefone:</strong> {aluno?.telefone || "Não disponível"}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Curso:</strong> {aluno?.curso || "Não disponível"}
                  </li>
                  <li className="list-group-item py-3">
                    <strong>Período:</strong> {aluno?.periodo || "Não disponível"}
                  </li>
                </ul>
              </Card.Body>
              <Card.Footer className="bg-light p-3">
                <Button variant="primary" className="w-100" data-bs-toggle="modal" data-bs-target="#cadastro">
                  <i className="bi bi-plus-circle me-2"></i>
                  Adicionar disciplina à grade
                </Button>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg={8} md={7}>
            <Card className="shadow custom-card">
              <Card.Header className="bg-primary text-white py-3">
                <h3 className="mb-0 fs-5">Grade Curricular</h3>
              </Card.Header>
              <Card.Body>
                {grades.length === 0 ? (
                  <Alert variant="info" className="text-center py-4 mb-0">
                    <i className="bi bi-info-circle-fill fs-4 mb-3 d-block"></i>
                    <h5>Nenhuma disciplina cadastrada</h5>
                    <p className="mb-0">Clique em "Adicionar disciplina à grade" para começar.</p>
                  </Alert>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>Disciplina</th>
                          <th>Professor</th>
                          <th>Sala</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grades.map((grade) => (
                          <tr key={grade.id}>
                            <td>{grade.disciplina.nome}</td>
                            <td>{grade.professor.nome}</td>
                            <td>{grade.sala.area} - {grade.sala.bloco} - {grade.sala.numero}</td>
                            <td>
                              <Badge
                                bg={
                                  grade.status === "Aprovado"
                                    ? "success"
                                    : grade.status === "Cursando"
                                      ? "primary"
                                      : grade.status === "Reprovado"
                                        ? "danger"
                                        : "secondary"
                                }
                              >
                                {grade.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <Button variant="secondary" size="lg" onClick={() => handleHome()}>
                <i className="bi bi-house-door me-2"></i>
                Voltar para Home
              </Button>
            </div>
          </Col>
        </Row>

        {/* Modal para adicionar disciplina */}
        <div className="modal fade" id="cadastro" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Matrícula em Disciplina
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body text-start">
                <div className="row">
                  <div className="col-12">
                    <h5 className="mb-3">Selecione uma Disciplina:</h5>
                    <div className="card">
                      {disciplinas.length == 0 ? (
                        <div className="card-body text-center py-4">
                          <p className="mb-0">Nenhuma disciplina disponível</p>
                        </div>
                      ) : (
                        <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
                          {disciplinas.map((disciplina) => (
                            <div key={disciplina.id} className="mb-3 border-bottom pb-3 card-hover">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  id={`disciplina-${disciplina.id}`}
                                  name="disciplina-selection"
                                  checked={selectedDisciplina?.id === disciplina.id}
                                  onChange={() => handleDisciplinaClick(disciplina)}
                                />
                                <label className="form-check-label w-100" htmlFor={`disciplina-${disciplina.id}`}>
                                  <h5 className="card-title">{disciplina.nome}</h5>
                                  <div className="d-flex justify-content-between">
                                    <p className="card-text mb-0">
                                      <span className="badge bg-info me-2">Carga: {disciplina.cargaHoraria}h</span>
                                      <span className="badge bg-secondary">Período: {disciplina.periodo}</span>
                                    </p>
                                    {disciplina.areaDeEstudo && (
                                      <p className="card-text mb-0">
                                        <span className="badge bg-light text-dark">
                                          Área: {disciplina.areaDeEstudo}
                                        </span>
                                      </p>
                                    )}
                                  </div>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <h5 className="mb-3">Selecione o Professor:</h5>
                    <select
                      className="form-select form-select-lg"
                      id="professorSelect"
                      value={selectedProfessor?.id || ""}
                      onChange={handleProfessorChange}
                      disabled={!selectedDisciplina}
                    >
                      <option value="">Selecione um professor</option>
                      {professores.map((professor) => (
                        <option key={professor.id} value={professor.id}>
                          {professor.nome} - {professor.formacao}
                        </option>
                      ))}
                    </select>
                    {selectedProfessor?.especializacao && (
                      <div className="mt-2 text-muted">
                        <small>Especialização: {selectedProfessor.especializacao}</small>
                      </div>
                    )}
                  </div>

                  <div className="col-12 mt-4">
                    <h5 className="mb-3">Selecione a Sala:</h5>
                    <select
                      className="form-select form-select-lg"
                      id="salaSelect"
                      value={selectedSala?.id || ""}
                      onChange={handleSalaChange}
                      disabled={!selectedDisciplina}
                    >
                      <option value="">Selecione uma sala</option>
                      {salas.map((sala) => (
                        <option key={sala.id} value={sala.id}>
                          {sala.area} - Bloco {sala.bloco} - Nº {sala.numero}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddDisciplina}
                  data-bs-dismiss="modal"
                  disabled={!selectedDisciplina || !selectedProfessor || !selectedSala}
                >
                  <i className="bi bi-save me-2"></i>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AlunoGradePage;
