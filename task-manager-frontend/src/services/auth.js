import API from './api';
import jwtDecode from 'jwt-decode';

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

export const saveToken = (token) => {
    localStorage.setItem('token', token);
}

export const logout = () => {
    localStorage.removeItem('token');
}

export const isLoggedIn = () => !!localStorage.getItem('token');

export const getUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return jwtDecode(token);
}