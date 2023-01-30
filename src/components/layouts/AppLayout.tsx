import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../molecules/navbar/AppNavbar';

export const AppLayout = () => {
	return (
		<div className='bg-primary-bright-5 flex h-full min-h-screen w-screen flex-row gap-4'>
			<AppNavbar />
			<Outlet />
		</div>
	);
};
