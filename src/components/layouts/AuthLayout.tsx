import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';

export const AuthLayout = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const isLoggedIn = Boolean(accessToken);

	if (isLoggedIn) {
		return <Navigate to='/app' />;
	}

	return (
		<div className='flex h-screen w-screen flex-row items-center justify-center'>
			{/* <AuthNavbar /> */}
			<div className='min-h-[350px] w-w-auth border border-primary-dark-2'>
				<Outlet />
			</div>
		</div>
	);
};
