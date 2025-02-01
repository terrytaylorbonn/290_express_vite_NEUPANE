// /client/src/Auth.jsx
import { useState } from 'react';
import axios from 'axios';
const Auth = () => {
    console.log('Auth component');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('Registering user:', username, password);
        try {
            await axios.post('http://localhost:8080/api/register', { username, password });
            alert('User registered successfully');
        } catch (err) {
            console.error('Error registering user:', err);
            alert('Error registering user');
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/login', { username, password });
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            alert('User logged in successfully');
        } catch (err) {
            console.error('Error logging in:', err);
            alert('Error logging in');
        }
    };
    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        alert('User logged out successfully');
    };
    return (
        <div>
            <h2>Authentication</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {token && (
                <div>
                    <h3>Token:</h3>
                    <pre>{token}</pre>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};
export default Auth;
