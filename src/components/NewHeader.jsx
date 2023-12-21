import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class NewHeader extends React.Component {
    render() {
        return (
            <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand><Link to="/" className="nav-link">GoalEase</Link></Navbar.Brand>
                        <Nav className="me-auto">
                            <Navbar.Brand><Link to="/" className="nav-link">Home</Link></Navbar.Brand>
                            <Navbar.Brand><Link to="/goalForm" className="nav-link">Goal Form</Link></Navbar.Brand>
                            <Navbar.Brand><Link to="/snakeGame" className="nav-link">Snake Game</Link></Navbar.Brand>
                            <Navbar.Brand><Link to="/about" className="nav-link">About</Link></Navbar.Brand>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}
export default NewHeader;