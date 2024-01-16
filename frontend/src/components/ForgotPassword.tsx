import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function ForgotPassword() {
    const [email, setEmail] = useState<string>('');

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();

        // Add logic to handle password reset, e.g., send a reset email
        console.log(`Reset password for email: ${email}`);
    };

    return (
        <div className="col-md-5 mx-auto m-5">
            <h1>Forgot Password</h1>
            <p>
                If you've forgotten your password, please enter your email address below,
                and we'll send you instructions on how to reset it.
            </p>

            <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Reset Password
                </Button>
            </Form>

            <Link to="/">Go back to Login</Link>
        </div>
    );
};

export default ForgotPassword;
