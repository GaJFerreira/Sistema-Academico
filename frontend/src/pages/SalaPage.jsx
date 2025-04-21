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
import { listarSalas, cadastrarSala } from "../services/SalaService";
import { data, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function SalaPage() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    area: "",
    bloco: "",
    numero: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    cadastrarSala(formData)
    .then((response) => {
        console.log("Sala cadastrada com sucesso!", response);
o
        setFormData({
          area: "",
          bloco: "",
          numero: "",
        });
      })
      .catch((err) => {
        console.error("Erro ao cadastrar Sala:", err);
      });
  };


  useEffect(() => {
    listarSalas()
      .then((data) => {
        setSalas(data);
      })
      .catch((err) => {
        console.error("Erro:", err);
        setSalas([]);
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
              <p class="card-text">Cadastrar nova sala</p>
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
              <p class="card-text">Editar cadastro de sala</p>
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
        <h2>Lista de Salas</h2>

        {salas.length == 0 ? (
          <p>Nenhuma sala encontrada</p>
        ) : (
          <table className="table table-bordered table-striped w-100" style={{ minWidth: "800px" }}>
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Area</th>
                <th scope="col">Bloco</th>
                <th scope="col">Numero</th>
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
                Cadastro de Sala
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
                  Area
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  required
                />
              </div>


              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Bloco
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="bloco"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={formData.bloco}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Numero
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="numero"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  value={formData.numero}
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

export default SalaPage;
