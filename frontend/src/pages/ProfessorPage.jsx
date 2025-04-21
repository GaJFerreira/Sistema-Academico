"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  Table,
  Modal,
} from "react-bootstrap";
import { data, useNavigate } from "react-router-dom";
import { listarProfessores,cadastrarProfessor } from "../services/ProfessorService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function ProfessorPage() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    formacao: "",
    especializacao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    cadastrarProfessor(formData)
    .then((response) => {
        console.log("Professor cadastrado com sucesso!", response);
o
        setFormData({
          nome: "",
          formacao: "",
          especializacao: "",
        });
      })
      .catch((err) => {
        console.error("Erro ao cadastrar professor:", err);
      });
  };


  useEffect(() => {
    listarProfessores()
      .then((data) => {
        setProfessores(data);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setProfessores([]);
      });
  });

  return (
    <div
      className="container d-flex justify-content-around align-items-center flex column mt-1"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center">
        <h3>Opções</h3>

        <div class="mb-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Cadastrar</h5>
              <p class="card-text">Cadastrar novo professor</p>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#cadastro"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>

        <div class="mb-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Editar</h5>
              <p class="card-text">Editar cadastro de professor</p>
              <Button
                variant="primary"
                className="m-2"
                onClick={() => navigate("/administrador")}
              >
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-intens-start">
        <h2>Lista de professores</h2>

        {professores.length == 0 ? (
          <p>Nenhum professor encontrado</p>
        ) : (
          <table className="table table-bordered table-striped w-100" style={{ minWidth: "800px" }}>
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
                  <td>{professor.especializacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div
        className="modal fade"
        id="cadastro"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cadastro de professor
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Nome
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  required
                />
              </div>


              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Formação
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="formacao"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={formData.formacao}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Especialização
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="especializacao"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={formData.especializacao}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button type="button" className="btn btn-primary" onClick={handleSave} data-bs-dismiss="modal">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorPage;
