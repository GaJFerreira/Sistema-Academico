import React from "react";
import { Container, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../estilos/EstiloGeral.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="container d-flex justify-content-center align-items-center flex column"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center">
        <h1 className="mb-4">Bem-vindo ao Sistema Universitário</h1>
        <h2 className="mb-3">Escolha uma opção de entrada</h2>

        <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Administrador</h5>
              <p class="card-text">Entrar como Administrador</p>
              <Button
                variant="primary"
                className="m-2"
                onClick={() => navigate("/administrador")}
              >
                Entrar como Administrador
              </Button>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Aluno</h5>
              <p class="card-text">
              Entrar como Aluno
              </p>
              <Button
                variant="success"
                className="m-2"
                onClick={() => navigate("/aluno")}
              >
                Entrar como Aluno
              </Button>
            </div>
          </div>
        </div>
      </div>

      </div>

    </div>
  );
}

export default HomePage;
