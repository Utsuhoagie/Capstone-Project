import { Outlet } from 'react-router-dom';
import { useDialogStore } from '../../app/App.store';
import { Dialog } from '../molecules/Dialog/Dialog';
import { AppNavbar } from '../molecules/Navbar/AppNavbar';

export const AppLayout = () => {
	const { isOpen, isClosable, title, content } = useDialogStore(
		(state) => state
	);
	return (
		<div className='mr-4 flex h-full min-h-screen w-screen flex-row'>
			<AppNavbar />
			<div className='flex-1 p-4'>
				<Outlet />
			</div>
			<Dialog
				isOpen={isOpen}
				isClosable={isClosable}
				title={title}
				content={content}
			/>
		</div>
	);
};
