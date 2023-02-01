import { Outlet } from 'react-router-dom';
import { useDialogStore } from '../../app/App.store';
import { Dialog } from '../molecules/Dialog/Dialog';
import { AppNavbar } from '../molecules/Navbar/AppNavbar';

export const AppLayout = () => {
	const { isOpen, isClosable, title, content } = useDialogStore(
		(state) => state
	);
	return (
		<div className='flex h-full min-h-screen w-screen flex-row gap-4 bg-primary-bright-7'>
			<AppNavbar />
			<Outlet />

			<Dialog
				isOpen={isOpen}
				isClosable={isClosable}
				title={title}
				content={content}
			/>
		</div>
	);
};
