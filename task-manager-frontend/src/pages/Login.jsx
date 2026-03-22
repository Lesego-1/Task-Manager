import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, saveToken } from '../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await loginUser({ email, password });
            saveToken(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            className="w-full p-2 mb-3 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={handleLogin}
            >
            Login
            </button>

            <p
            className="text-center mt-3 text-blue-500 cursor-pointer"
            onClick={() => navigate('/register')}
            >
            Go to Register
            </p>
        </div>
        </div>
    )
}

export default Login;