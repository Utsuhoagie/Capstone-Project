import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';
import { AuthNavbar } from '../molecules/Navbar/AuthNavbar';

export const AuthLayout = () => {
	const navigate = useNavigate();
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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
