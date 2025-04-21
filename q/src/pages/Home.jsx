"use client"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../estilos/EstiloGeral.css"

function HomePage() {
  const navigate = useNavigate()

  return (
    <div
      className="container d-flex justify-content-center align-items-center flex column"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center">
        <h1 className="mb-4">Bem-vindo ao Sistema Universitário</h1>
        <h2 className="mb-3">Escolha uma opção de entrada</h2>

        <div className="row">
          <div className="col-sm-4 mb-2">
            <div className="card">
              <h5 className="card-header">Administrador</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Entrar como Administrador</p>
                <Button variant="primary" className="m-2" onClick={() => navigate("/administrador")}>
                  Entrar como Administrador
                </Button>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-2">
            <div className="card">
              <h5 className="card-header">Aluno</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Entrar como Aluno</p>
                <Button variant="success" className="m-2" onClick={() => navigate("/aluno")}>
                  Entrar como Aluno
                </Button>
              </div>
            </div>
          </div>

          <div className="col-sm-4 mb-2">
            <div className="card">
              <h5 className="card-header">Professor</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Gerenciar Professores</p>
                <Button variant="info" className="m-2" onClick={() => navigate("/professor")}>
                  Gerenciar Professores
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
