"use client"
import "../estilos/EstiloGeral.css"
import { Button } from "react-bootstrap"
import { Navigate,useNavigate } from "react-router-dom"

function AdministradorPage() {

  const navigate = useNavigate();

  return (
    <div
      className="container d-flex justify-content-center align-items-center flex column"
      
    >
      <div className="text-center">
        <h1 className="mb-4">Bem-vindo Administrador</h1>
        <h2 className="mb-3">Opções de acesso</h2>

        <div className="row">
          <div className="col-sm-6 mb-2">
            <div className="card">
              <h5 className="card-header">Gerenciar professores</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Fazer cadastro, edição e gerenciamento dos professores.</p>
                <Button
                  variant="primary"
                  className="m-2"
                  onClick={() => navigate("/administrador/professor")}
                >
                  Pagina professor
              </Button>
              </div>
            </div>
          </div>

          <div class="col-sm-6 mb-2">
            <div className="card">
              <h5 className="card-header">Gerenciamento de sala</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Fazer cadastro, edição e gerenciamento de salas.</p>
                <Button
                  variant="primary"
                  className="m-2"
                  onClick={() => navigate("/administrador/sala")}
                >
                  Pagina sala
              </Button>
              </div>
            </div>
          </div>

          <div class="col-sm-6 mb-2">
            <div className="card">
              <h5 className="card-header">Gerenciamento de disciplias</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Fazer cadastro, edição e gerenciamento de disciplinas.</p>
                <Button
                  variant="primary"
                  className="m-2"
                  onClick={() => navigate("/administrador/disciplina")}
                >
                  Pagina disciplia
              </Button>
              </div>
            </div>
          </div>

          <div class="col-sm-6 mb-2">
            <div className="card">
              <h5 className="card-header">Gerenciamento de alunos</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Fazer cadastro, edição e gerenciamento de alunos.</p>
                <Button
                  variant="primary"
                  className="m-2"
                  onClick={() => navigate("/administrador/alunos")}
                >
                  Pagina alunos
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdministradorPage
