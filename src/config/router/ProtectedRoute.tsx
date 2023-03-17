import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';

export const ProtectedRoute = ({
	element,
}: {
	element: React.ReactElement;
}) => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const isLoggedIn = Boolean(accessToken);

	return isLoggedIn ? element : <Navigate to='auth' replace />;
};
