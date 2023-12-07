import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Redirect, useHistory} from "react-router-dom";
import {NavbarText} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function TopNavigationBar() {

    const history = useHistory();
    const handleLogout = () => {
        // Clear the authentication token from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('roles');

        // Redirect to the login page
        history.push('/login');
    };

// Check if the user is authenticated (has a token)
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Redirect to="/login" />;
    }

    let email: string|null = localStorage.getItem('email') || '';


    const themeColor = "dark";
    return (
        <Navbar bg="dark" data-bs-theme={themeColor}>
            <Container>
                <Navbar.Brand href="/dashboard">Tutor Report</Navbar.Brand>
                <Navbar.Brand href="/dashboard">Home</Navbar.Brand>
                <Navbar.Brand href="/create-report">Write report</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <NavbarText className="me-3">{email}</NavbarText>
                    <Button type="button" className="btn btn-danger" onClick={handleLogout} >Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavigationBar;