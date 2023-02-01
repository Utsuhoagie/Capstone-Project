import { useNavigate } from 'react-router-dom';
import { Routes } from '../config/router/Routes';
import { useAuthStore } from '../modules/auth/Auth.store';

export const App = () => {
	return <Routes />;
};
