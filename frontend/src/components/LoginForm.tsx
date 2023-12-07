import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Stack} from "react-bootstrap";
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

function LoginForm() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();

    const url = 'http://localhost:8080/auth/login';
    const endpoint = 'api/auth/login';
    const handleLogin = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log(email);
            console.log(password);

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
        <Stack gap={2} className="col-md-5 mx-auto m-5">
            <Form>
                <h1>Login</h1>
                <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </Form.Group>
                <Form.Group className="mb-3 w-75" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button
                    variant="primary"
                    type="button"
                    onClick={handleLogin}
                >
                    Submit
                </Button>
            </Form>
        </Stack>
    );
}

export default LoginForm;