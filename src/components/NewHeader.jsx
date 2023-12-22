import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const NewHeader = ({ auth0 }) => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

    function handleLogin() {
        loginWithRedirect();
    }

    function handleLogout() {
        logout({ returnTo: window.location.origin });
    }

    return (
        <Navbar bg="dark" expand="lg" fixed="top" className="px-4 px-md-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center w-100">
                <Navbar.Brand as={Link} to="#" className="nav-brand">
                    GoalEase
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="nav-words" as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link className="nav-words" as={Link} to="/">
                            About
                        </Nav.Link>
                        {
                            isAuthenticated ? (
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
                            ) : null
                        }
                    </Nav>
                    <Nav className="ml-auto">
                        {isAuthenticated ? (
                            <Nav.Link className="nav-words" onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </Nav.Link>
                        ) : (
                            <Nav.Link onClick={handleLogin} className="nav-words">
                                <FaSignInAlt /> Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NewHeader