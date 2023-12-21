import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

class NewHeader extends React.Component {
    render() {
        // Assuming useSelector can be used here. If not, consider other ways to access Redux state.
        const user = useSelector((state) => state.auth.user);

        const onLogout = () => {
            // Implement logout functionality
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
                            <Nav.Link className="nav-words" as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className="nav-words" as={Link} to="/about">About</Nav.Link>
                            <NavDropdown
                                className="nav-words"
                                title="Options"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item as={Link} to="/newGoal">Make A New Goal</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/snakeGame">Play Snake Game</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/publicComment">Make A Public Comment</NavDropdown.Item>
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
}

export default NewHeader;
