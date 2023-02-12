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
		<nav className='bg-primary-dark2 text-primary-bright2 h-screen w-[200px] min-w-[200px]'>
			<ul className='flex flex-col items-start'>
				<NavItem onClick={handleLogout}>Logout</NavItem>
				<NavItem>Link 2</NavItem>
			</ul>
		</nav>
	);
};
