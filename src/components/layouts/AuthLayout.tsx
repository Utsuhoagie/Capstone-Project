import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';
import { AuthNavbar } from '../molecules/Navbar/AuthNavbar';

export const AuthLayout = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	return isLoggedIn ? (
		<Navigate replace to='app' />
	) : (
		<div className='bg-primary-bright2 flex h-screen w-screen flex-row'>
			<AuthNavbar />
			<Outlet />
		</div>
	);
};
