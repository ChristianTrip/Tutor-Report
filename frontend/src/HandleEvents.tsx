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

            return { token, userEmail, roles };
        } else {
            throw new Error('Login failed');
        }
    } catch (error: any) {
        throw new Error(`Error during login: ${error.message}`);
    }
};

export default login;
