import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../modules/auth/Auth.store';
import { NavItem } from './NavItem';

export const AuthNavbar = () => {
	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	function handleLogin() {
		login('FooUser', '123');
		navigate('/app', { replace: true });
	}

	return (
		<nav className='h-screen w-48 bg-primary-dark2 py-4 text-primary-bright2'>
			<ul className='flex flex-col items-start'>
				<NavItem onClick={handleLogin}>Login</NavItem>
				<NavItem>Link 2</NavItem>
			</ul>
		</nav>
	);
};
