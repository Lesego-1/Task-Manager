import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await registerUser({ email, password });
            alert('User registered!');
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.error || 'Error');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Register</h2>

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
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={handleRegister}
            >
            Register
            </button>
        </div>
        </div>
    )
}

export default Register;