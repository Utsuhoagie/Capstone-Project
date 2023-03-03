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
		<nav className='fixed h-screen w-w-navbar bg-primary-dark-2'>
			<ul className='flex flex-col items-start'>
				<NavItem onClick={handleLogout}>Đăng xuất</NavItem>

				<NavItem onClick={() => navigate('applicants')}>Ứng Viên</NavItem>

				<NavItem onClick={() => navigate('employees')}>Nhân viên</NavItem>
			</ul>
		</nav>
	);
};
