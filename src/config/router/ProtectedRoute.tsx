import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';

export const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	return isLoggedIn ? element : <Navigate to='auth' replace />;
};
