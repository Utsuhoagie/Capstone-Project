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
		<nav className='fixed h-screen w-w-navbar bg-primary-dark-2'>
			<ul className='flex flex-col items-start'>
				<NavItem onClick={handleLogin}>Login</NavItem>
				<NavItem>Link 2</NavItem>
			</ul>
		</nav>
	);
};
