import { Outlet } from 'react-router-dom';
import { Dialog } from '../molecules/Dialog/Dialog';
import { AppNavbar } from '../molecules/Navbar/AppNavbar';
import { Toast } from '../molecules/Toast/Toast';

export const AppLayout = () => {
	return (
		<div className='h-full min-h-screen w-screen'>
			<AppNavbar />
			<div className='ml-w-navbar mr-4 h-full p-4'>
				<Outlet />
			</div>

			<Dialog />
			<Toast />
		</div>
	);
};
