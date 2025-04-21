"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { buscAlunoMatricula, salvarAluno } from "../services/alunoService"
import { buscarGradeMatricula } from "../services/gradeService"
import { Button, Modal } from "react-bootstrap"
import { listarDisciplinas } from "../services/disciplinaService"
import { listarProfessores } from "../services/ProfessorService"

function AlunoGradePage() {
  const [aluno, setAluno] = useState(null) // Armazena um único aluno
  const [error, setError] = useState(null)
  const [grades, setGrades] = useState([]) // Array de grades
  const [showModal, setShowModal] = useState(false) // Controla o estado do modal
  const [disciplinas, setDisciplinas] = useState([]) // Disciplinas
  const [selectedDisciplina, setSelectedDisciplina] = useState(null) // Disciplina selecionada
  const [selectedProfessor, setSelectedProfessor] = useState("") // Professor selecionado
  const navigate = useNavigate()
  const [professores, setProfessores] = useState([])

  // Recupera a matrícula do localStorage
  const matricula = localStorage.getItem("matricula")

  // Carregar os dados do aluno, grades e disciplinas
  useEffect(() => {
    if (matricula) {
      buscAlunoMatricula(matricula)
        .then((data) => {
          setAluno(data) // Definir os dados do aluno no estado
        })
        .catch((err) => {
          console.error("Erro ao buscar aluno:", err)
          setError("Erro ao buscar aluno")
        })

      // Carregar as grades do aluno
      buscarGradeMatricula(matricula)
        .then((data) => {
          setGrades(data) // Definir as grades no estado
        })
        .catch((err) => {
          console.error("Erro ao buscar grades:", err)
          setError("Erro ao buscar grades")
        })
    } else {
      setError("Matrícula não encontrada.")
    }

    // Carregar as disciplinas
    listarDisciplinas()
      .then((data) => {
        setDisciplinas(data) // Definir as disciplinas no estado
      })
      .catch((err) => {
        console.error("Erro ao listar disciplinas:", err)
      })

    listarProfessores()
      .then((data) => {
        setProfessores(data)
      })
      .catch((err) => {
        console.error("Erro ao listar professores:", err)
      })
  }, [matricula])

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const handleDisciplinaClick = (disciplina) => {
    setSelectedDisciplina(disciplina) // Atualiza a disciplina selecionada
  }

  const handleProfessorChange = (e) => {
    setSelectedProfessor(e.target.value) // Atualiza o professor selecionado
  }

  const handleAddDisciplina = () => {
    console.log("Adicionando disciplina:", selectedDisciplina, "com professor:", selectedProfessor)
    salvarAluno(aluno.id, aluno)

    setShowModal(false)
    setSelectedDisciplina(null) // Limpar seleção de disciplina
    setSelectedProfessor("") // Limpar seleção de professor
  }

  const handleHome = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="">
      <h1 className="text-center" style={{ margin: "2rem" }}>
        Área do Aluno
      </h1>

      <div className="d-flex justify-content-center">
        {/* Dados do aluno */}
        <div className="card" style={{ width: "20rem", margin: "2rem" }}>
          <div className="card-header bg-secondary text-light">Dados do Aluno</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Nome:</strong> {aluno?.nome || "Não disponível"}
            </li>
            <li className="list-group-item">
              <strong>Matricula:</strong> {aluno?.matricula || "Não disponível"}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {aluno?.email || "Não disponível"}
            </li>
            <li className="list-group-item">
              <strong>Telefone:</strong> {aluno?.telefone || "Não disponível"}
            </li>
            <li className="list-group-item">
              <strong>Curso:</strong> {aluno?.curso || "Não disponível"}
            </li>
            <li className="list-group-item">
              <strong>Período:</strong> {aluno?.periodo || "Não disponível"}
            </li>
          </ul>
        </div>

        {/* Lista de grades do aluno */}
        <div className="list-group flex-fill" style={{ margin: "2rem" }}>
          {grades.length === 0 ? (
            <div className="p-3 text-primary-emphasis bg-primary border border-primary-subtle rounded-3">
              Este aluno não está matriculado em nenhuma disciplina.
            </div>
          ) : (
            grades.map((grade) => (
              <div key={grade.id} className="card mb-2" style={{ width: "20rem" }}>
                <div className="card-header p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
                  {grade.disciplina.nome} - {grade.professor.nome}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Disciplina:</strong> {grade.disciplina.nome}
                  </li>
                  <li className="list-group-item">
                    <strong>Professor:</strong> {grade.professor.nome}
                  </li>
                  <li className="list-group-item">
                    <strong>Sala:</strong> {grade.sala.nome}
                  </li>
                  <li className="list-group-item">
                    <strong>Status:</strong> {grade.status}
                  </li>
                </ul>
              </div>
            ))
          )}

          <Button variant="primary" onClick={handleShowModal}>
            Adicionar Disciplina
          </Button>

          {/* Modal para Adicionar Disciplina */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Disciplina</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {disciplinas.length === 0 ? (
                <p>Nenhuma disciplina disponível.</p>
              ) : (
                disciplinas.map((disciplina) => (
                  <div
                    key={disciplina.id}
                    className={`card mb-2 ${selectedDisciplina?.id === disciplina.id ? "border-primary" : ""}`}
                    onClick={() => handleDisciplinaClick(disciplina)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body p-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{disciplina.nome}</strong>
                          <div className="small text-muted">
                            Carga Horária: {disciplina.cargaHoraria} | Período: {disciplina.periodo}
                          </div>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="disciplinaRadio"
                            checked={selectedDisciplina?.id === disciplina.id}
                            onChange={() => handleDisciplinaClick(disciplina)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {selectedDisciplina && (
                <div className="mt-3 p-3 border rounded">
                  <h5>Selecione um professor para {selectedDisciplina.nome}</h5>
                  {professores.length == 0 ? (
                    <div className="p-3 text-primary-emphasis bg-primary border border-primary-subtle rounded-3">
                      Nehum professor disponivel.
                    </div>
                  ) : (
                    <select className="form-select mt-2" value={selectedProfessor} onChange={handleProfessorChange}>
                      <option value="">Selecione um professor</option>
                      {professores.map((professor) => (
                        <option value={professor.id}>{professor.nome}</option>
                      ))}
                    </select>
                  )}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>
              <Button
                variant="primary"
                onClick={handleAddDisciplina}
                disabled={!selectedDisciplina || !selectedProfessor}
              >
                Adicionar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => handleHome()}>
          Voltar para Home
        </Button>
      </div>
    </div>
  )
}

export default AlunoGradePage
