import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/Home"
import AlunoPage from "./pages/AlunoPage"
import AdnministradorPage from "./pages/AdministradorPage"
import AlunoCadastroPage from "./pages/AlunoCadastroPage"
import AlunoLoginPage from "./pages/AlunoLoginPage"
import AlunoGradePage from "./pages/AlunoGradePage"
import ProfessorPage from "./pages/ProfessorPage"
import ProfessorCadastroPage from "./pages/ProfessorCadastroPage"
import ProfessorEditarPage from "./pages/ProfessorEditarPage"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aluno" element={<AlunoPage />} />
        <Route path="/aluno/cadastro" element={<AlunoCadastroPage />} />
        <Route path="/aluno/login" element={<AlunoLoginPage />} />
        <Route path="/aluno/grade" element={<AlunoGradePage />} />
        <Route path="/administrador" element={<AdnministradorPage />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/professor/cadastro" element={<ProfessorCadastroPage />} />
        <Route path="/professor/editar/:id" element={<ProfessorEditarPage />} />
      </Routes>
    </Layout>
  )
}

export default App
