import { Navbar, Container } from "react-bootstrap"
import "../estilos/EstiloGeral.css"
import logo from "../assets/logo.png"

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
    <Container>
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img src={logo || "/placeholder.svg"} alt="Logo" width="50" height="34" className="me-2" />
        <span className="fw-bold">Sistema Acadêmico Universitário</span>
      </a>
    </Container>
  </Navbar>
)

export default Header
