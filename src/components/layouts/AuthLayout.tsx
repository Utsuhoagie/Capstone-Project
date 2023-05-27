import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';
import { Toast } from '../molecules/Toast/Toast';
import Logo from '../../assets/img/Logo.png';

export const AuthLayout = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const isLoggedIn = Boolean(accessToken);

	if (isLoggedIn) {
		return <Navigate to='/app' />;
	}

	return (
		<div className='flex h-screen w-screen flex-row items-start justify-center'>
			{/* <AuthNavbar /> */}
			<div className='mt-12 flex flex-col items-center gap-8'>
				<div className='h-60 w-60 rounded border border-primary-dark-1'>
					<img className='h-full w-full rounded' src={Logo} />
				</div>
				<div className='min-h-[350px] w-w-auth border border-primary-dark-2'>
					<Outlet />
				</div>
			</div>

			<Toast />
		</div>
	);
};
