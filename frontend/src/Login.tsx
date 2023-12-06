// src/components/LoginPage.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await fetch('api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const email = data.email;
                const roles = data.roles;

                // Store the token in localStorage
                localStorage.setItem('email', email);
                localStorage.setItem('token', token);
                localStorage.setItem('roles', roles);

                // Redirect to the main page
                history.push('/dashboard');
            } else {
                // Handle login failure
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login Page</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
