import React from 'react';
import { Nav, Navbar, Container, NavbarText, Button } from 'react-bootstrap';

import { Redirect, useHistory, NavLink } from 'react-router-dom';


interface TopNavigationBarProps {
    showAdminTab?: boolean;
}

const TopNavigationBar: React.FC<TopNavigationBarProps> = ({ showAdminTab = false }) => {
    const history = useHistory();

    const handleLogout = () => {
        // Clear the authentication token from localStorage
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('roles');

        history.push('/login');
    };

    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    let email: string | null = localStorage.getItem('email') || '';

    const themeColor = 'dark';

    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/dashboard">Tutor Report</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/report-list">
                            Se rapporter
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/create-report">
                            Skriv rapport
                        </Nav.Link>
                        {showAdminTab && (
                            <Nav.Link as={NavLink} to="/admin">
                                Administrere brugere
                            </Nav.Link>
                        )}
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <NavbarText className="me-3">{email}</NavbarText>
                        <Button type="button" className="btn btn-danger" onClick={handleLogout}>
                            Log ud
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-5 pt-5"></Container>
        </>

    );
};

export default TopNavigationBar;
