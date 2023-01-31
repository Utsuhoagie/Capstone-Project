import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../molecules/navbar/AppNavbar';

export const AppLayout = () => {
	return (
		<div className='flex h-full min-h-screen w-screen flex-row gap-4 bg-primary-bright-7'>
			<AppNavbar />
			<Outlet />
		</div>
	);
};
