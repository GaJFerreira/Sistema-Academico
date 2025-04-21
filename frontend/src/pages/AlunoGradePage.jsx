"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buscAlunoMatricula, salvarAluno } from "../services/alunoService";
import { buscarGradeMatricula } from "../services/gradeService";
import { Button, Modal } from "react-bootstrap";
import { listarDisciplinas } from "../services/disciplinaService";
import { listarProfessores } from "../services/ProfessorService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function AlunoGradePage() {
  const [aluno, setAluno] = useState(null); // Armazena um único aluno
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]); // Array de grades
  const [showModal, setShowModal] = useState(false); // Controla o estado do modal
  const [disciplinas, setDisciplinas] = useState([]); // Disciplinas
  const [selectedDisciplina, setSelectedDisciplina] = useState(null); // Disciplina selecionada
  const [selectedProfessor, setSelectedProfessor] = useState([]); // Professor selecionado
  const navigate = useNavigate();
  const [professores, setProfessores] = useState([]);

  // Recupera a matrícula do localStorage
  const matricula = localStorage.getItem("matricula");

  // Carregar os dados do aluno, grades e disciplinas
  useEffect(() => {
    if (matricula) {
      buscAlunoMatricula(matricula)
        .then((data) => {
          setAluno(data); // Definir os dados do aluno no estado
        })
        .catch((err) => {
          console.error("Erro ao buscar aluno:", err);
          setError("Erro ao buscar aluno");
        });

      // Carregar as grades do aluno
      buscarGradeMatricula(matricula)
        .then((data) => {
          setGrades(data); // Definir as grades no estado
        })
        .catch((err) => {
          console.error("Erro ao buscar grades:", err);
          setError("Erro ao buscar grades");
        });
    } else {
      setError("Matrícula não encontrada.");
    }

    // Carregar as disciplinas
    listarDisciplinas()
      .then((data) => {
        setDisciplinas(data); // Definir as disciplinas no estado
      })
      .catch((err) => {
        console.error("Erro ao listar disciplinas:", err);
      });

    listarProfessores()
      .then((data) => {
        setProfessores(data);
      })
      .catch((err) => {
        console.error("Erro ao listar professores:", err);
      });
  }, [matricula]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDisciplinaClick = (disciplina) => {
    setSelectedDisciplina(disciplina); // Atualiza a disciplina selecionada
  };

  const handleProfessorChange = (e) => {
    const professorSelecionado = professores.find(p => p.id == e.target.value);
    setSelectedProfessor(professorSelecionado);
  };

  const handleAddDisciplina = () => {
    console.log(
      "Adicionando disciplina:",
      selectedDisciplina,
      "com professor:",
      selectedProfessor
    );

    // salvarAluno(aluno.id, aluno);

    setShowModal(false);
    setSelectedDisciplina(null); // Limpar seleção de disciplina
    setSelectedProfessor(""); // Limpar seleção de professor
  };

  const handleHome = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="container d-flex justify-content-around align-items-center flex column mt-1"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center">
        <h1 className="mb-4">Bem-vindo!</h1>
        <h2 className="mb-3">Área do aluno</h2>

        <div className="d-flex justify-content-start">
          <div className="align-items-start">
            <div className="card m-2" style={{ width: "20rem" }}>
              <div className="card-header bg-dark text-light">
                Dados do Aluno
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Nome:</strong> {aluno?.nome || "Não disponível"}
                </li>
                <li className="list-group-item">
                  <strong>Matricula:</strong>{" "}
                  {aluno?.matricula || "Não disponível"}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {aluno?.email || "Não disponível"}
                </li>
                <li className="list-group-item">
                  <strong>Telefone:</strong>{" "}
                  {aluno?.telefone || "Não disponível"}
                </li>
                <li className="list-group-item">
                  <strong>Curso:</strong> {aluno?.curso || "Não disponível"}
                </li>
                <li className="list-group-item">
                  <strong>Período:</strong> {aluno?.periodo || "Não disponível"}
                </li>
              </ul>
            </div>

            <div className="mb-2">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#cadastro"
              >
                Adicionar disciplina à grade
              </button>
            </div>
          </div>

          <div className="container m-2">
            {grades.length === 0 ? (
              <div className="card-header bg-dark text-light">
                Nehuma disciplina cadastrada
              </div>
            ) : (
              <div className="ttable table-bordered table-striped">
                <table
                  className="table table-bordered table-striped w-100"
                  style={{ minWidth: "800px" }}
                >
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
                        <td>
                          Area {grade.sala.area} bloco {grade.sala.bloco} numero{" "}
                          {grade.sala.numero}
                        </td>
                        <td>{grade.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="modal fade" id="cadastro" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Matricula na disciplina
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body text-start">
                <div className="row">
                  <div className="">
                    <div className="card">
                      {disciplinas.length == 0 ? (
                        <p>Nehuma disciplina disponivel</p>
                      ) : (
                        <div className="card-body">
                          {disciplinas.map((disciplina) => (
                            <div key={disciplina.id} className="mb-3 border-bottom pb-2 card-hover">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`disciplina-${disciplina.id}`}
                                  checked={selectedDisciplina?.id === disciplina.id}
                                  onChange={() => handleDisciplinaClick(disciplina)}
                                />
                                <label className="form-check-label" htmlFor={`disciplina-${disciplina.id}`}>
                                  <h5 className="card-title">{disciplina.nome}</h5>
                                  <p className="card-text">
                                    Carga horária: {disciplina.cargaHoraria} | Período: {disciplina.periodo}
                                  </p>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="professorSelect" className="form-label">
                      Selecione o Professor:
                    </label>
                    <select
                      className="form-select"
                      id="professorSelect"
                      value={selectedProfessor}
                      onChange={handleProfessorChange}
                    >
                      <option value="">Selecione um professor</option>
                      {professores.map((professor) => (
                        <option key={professor.id} value={professor.id}>
                          {professor.nome}
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
                  disabled={!selectedDisciplina || !selectedProfessor}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Button variant="secondary" onClick={() => handleHome()}>
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AlunoGradePage;
