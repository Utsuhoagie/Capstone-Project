import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';
import { AuthNavbar } from '../molecules/navbar/AuthNavbar';

export const AuthLayout = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	return isLoggedIn ? (
		<Navigate replace to='app' />
	) : (
		<div className='flex h-screen w-screen flex-row bg-primary-bright2'>
			<AuthNavbar />
			<Outlet />
		</div>
	);
};
