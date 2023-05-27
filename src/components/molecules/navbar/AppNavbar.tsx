import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../modules/auth/Auth.store';
import { NavItem } from './NavItem';
import Logo from '../../../assets/img/Logo.png';

export const AppNavbar = () => {
	const unsetLogin = useAuthStore((state) => state.unsetLogin);
	const navigate = useNavigate();

	function handleLogout() {
		unsetLogin();
		navigate('/auth', { replace: true });
	}

	return (
		<nav className='fixed h-screen w-w-navbar bg-primary-dark-2'>
			<ul className='flex flex-col items-start'>
				<img className='p-2' src={Logo} />

				<NavItem onClick={handleLogout}>Đăng xuất</NavItem>

				<NavItem onClick={() => navigate('qr')}>QR</NavItem>

				<NavItem onClick={() => navigate('attendances')}>Chấm công</NavItem>

				<NavItem onClick={() => navigate('applicants')}>Ứng Viên</NavItem>

				<NavItem onClick={() => navigate('employees')}>Nhân viên</NavItem>

				<NavItem onClick={() => navigate('positions')}>Vị trí</NavItem>

				<NavItem onClick={() => navigate('requests')}>Yêu cầu</NavItem>

				<NavItem onClick={() => navigate('feedbacks')}>Góp ý</NavItem>
			</ul>
		</nav>
	);
};
