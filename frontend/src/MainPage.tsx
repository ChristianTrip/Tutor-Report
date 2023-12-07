// src/components/MainPage.tsx
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

const MainPage: React.FC = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Clear the authentication token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        history.push('/');
    };

    // Check if the user is authenticated (has a token)
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Redirect to="/" />;
    }

    let email: string|null = localStorage.getItem('email') || '';

    // Display the main page content
    return (
        <div className="container mt-5">
            <h2>Main Page - Dashboard</h2>
            {/* Your dashboard components go here */}
        </div>
    );
};

export default MainPage;
