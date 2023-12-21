import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import Login from '../Auth/Login'

function Header() {
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
   
  };

  return (
    <Navbar bg="dark" expand="lg" fixed="top" className="px-4 px-md-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Navbar.Brand as={Link} to="/" className="nav-brand">
            GoalEase
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-words" as={Link} to="/">
                Home
              </Nav.Link>
              <NavDropdown
                className="nav-words"
                title="Options"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">
                  Make A New Goal
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Play Snake Game
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Make A Public Comment
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              {user ? (
                <Nav.Link className="nav-words" onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" className="nav-words">
                  <FaSignInAlt /> Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      
    </Navbar>
  );
}

export default Header;
