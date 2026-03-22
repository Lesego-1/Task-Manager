import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/auth';

const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute;