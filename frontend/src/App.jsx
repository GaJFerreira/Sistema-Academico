import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/Home"
import AlunoPage from "./pages/AlunoPage"
import AdnministradorPage from "./pages/AdministradorPage"
import AlunoCadastroPage from "./pages/AlunoCadastroPage"
import AlunoLoginPage from "./pages/AlunoLoginPage"
import AlunoGradePage from "./pages/AlunoGradePage"
import ProfessorPage from "./pages/ProfessorPage"
import SalaPage from "./pages/SalaPage"
import DisciplinaPage from "./pages/DisciplinaPage"

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
        <Route path="/administrador/professor" element={<ProfessorPage />} />
        <Route path="/administrador/sala" element={<SalaPage />} />
        <Route path="/administrador/disciplina" element={<DisciplinaPage />} />z
      </Routes>
    </Layout>
  )
}

export default App
