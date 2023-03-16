import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../modules/auth/Auth.store';
import { ConfirmDialog } from '../molecules/ConfirmDialog/ConfirmDialog';
import { Dialog } from '../molecules/Dialog/Dialog';
import { AppNavbar } from '../molecules/Navbar/AppNavbar';
import { Toast } from '../molecules/Toast/Toast';

export const AppLayout = () => {
	const { accessToken, unsetLogin } = useAuthStore();
	const isLoggedIn = Boolean(accessToken);

	if (!isLoggedIn) {
		unsetLogin();
		return <Navigate to='/auth' />;
	}

	return (
		<div className='h-full min-h-screen w-screen'>
			<AppNavbar />
			<div className='ml-w-navbar mr-4 h-full p-4'>
				<Outlet />
			</div>

			<Dialog />
			<ConfirmDialog />
			<Toast />
		</div>
	);
};
