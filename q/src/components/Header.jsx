import { Navbar, Container } from "react-bootstrap"
import "../estilos/EstiloGeral.css"
import logo from "../assets/logo.png"

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <a className="navbar-brand" href="#">
        <img src={logo} alt="Logo" width="50" height="34" />
        <i className="fas fa-tachometer-fastest    ">Sistema academico.</i>
      </a>
    </Container>
  </Navbar>
)

export default Header
