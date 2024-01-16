import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Stack} from "react-bootstrap";
import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import login from "../HandleEvents";

function LoginForm() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const { token, userEmail, roles } = await login(email, password);

            localStorage.setItem('email', userEmail);
            localStorage.setItem('token', token);
            localStorage.setItem('roles', roles);
            history.push('/dashboard');
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <Stack gap={2} className="col-md-5 mx-auto m-5">
            <Form>
                <h1>Codelab Rapport Login</h1>
                <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
                    <Form.Label>Email Adresse</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Skriv din email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        Det er din kea mail
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
                    <Form.Label>Adgangskode</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Adgangskode"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        <a href="/forgot-password">Glemt adgangskode?</a>
                    </Form.Text>
                </Form.Group>
                <Button
                    variant="primary"
                    type="button"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Form>
        </Stack>
    );
}

export default LoginForm;