import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button  from "react-bootstrap/Button";
import  Container  from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const Header = () => {

    return(
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'gold'}}>
                    <FontAwesomeIcon icon={faVideoSlash} />Gold
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav 
                        className="me-auto"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavLink to="n/" className="nav-link">Home</NavLink>
                        <NavLink to="/games" className="nav-link">Games</NavLink>
                        <NavLink to="/about" className="nav-link">About</NavLink>
                    </Nav>
                    <Button variant="outline-info" className="me-2">Sign Up</Button>
                    <Button variant="outline-info" className="me-2">Login</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;