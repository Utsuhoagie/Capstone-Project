import { useNavigate } from 'react-router-dom';
import { RoutesAll } from '../config/router/RoutesAll';
import { useAuthStore } from '../modules/auth/Auth.store';

export const App = () => {
	return <RoutesAll />;
};
