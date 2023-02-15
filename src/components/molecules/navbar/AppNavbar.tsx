import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../modules/auth/Auth.store';
import { NavItem } from './NavItem';

export const AppNavbar = () => {
	const logout = useAuthStore((state) => state.logout);
	const navigate = useNavigate();

	function handleLogout() {
		logout();
		navigate('/auth', { replace: true });
	}

	return (
		<nav className='h-screen w-[200px] min-w-[200px] bg-primary-dark-2'>
			<ul className='flex flex-col items-start'>
				<NavItem onClick={handleLogout}>Logout</NavItem>
				<NavItem>Link 2</NavItem>
			</ul>
		</nav>
	);
};
