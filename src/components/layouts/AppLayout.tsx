import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../molecules/navbar/AppNavbar';

export const AppLayout = () => {
	return (
		<div className='flex h-screen w-screen flex-row gap-4 bg-primary-bright-3'>
			<AppNavbar />
			<Outlet />
		</div>
	);
};
