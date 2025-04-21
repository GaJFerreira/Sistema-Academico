"use client"
import "../estilos/EstiloGeral.css"

function AdministradorPage() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center flex column"
      style={{ minHeight: "80vh" }}
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
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 mb-2">
            <div className="card">
              <h5 className="card-header">Gerenciamento de sala</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Fazer cadastro, edição e gerenciamento de salas.</p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 mb-2">
            <div className="card">
              <h5 className="card-header">Gerenciamento de disciplias</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Fazer cadastro, edição e gerenciamento de disciplinas.</p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

          <div class="col-sm-6 mb-2">
            <div className="card">
              <h5 className="card-header">Gerenciamento de alunos</h5>
              <div className="card-body">
                <h5 className="card-title"></h5>
                <p className="card-text">Fazer cadastro, edição e gerenciamento de alunos.</p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdministradorPage
