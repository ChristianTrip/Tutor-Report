// authService.js
const url = 'http://localhost:8080/auth/login';

const login = async (email: string, password: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            const userEmail = data.email;
            const roles = data.roles;

            // Return data for successful login
            return { token, userEmail, roles };
        } else {
            // Handle login failure
            throw new Error('Login failed');
        }
    } catch (error: any) {
        // Handle other errors
        throw new Error(`Error during login: ${error.message}`);
    }
};

export default login;
