import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../molecules/navbar/AppNavbar';

export const AppLayout = () => {
	return (
		<div className='flex h-screen w-screen flex-row bg-primary-bright2'>
			<AppNavbar />
			<Outlet />
		</div>
	);
};
