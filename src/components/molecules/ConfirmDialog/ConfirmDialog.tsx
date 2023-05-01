import { Dialog as HuiDialog } from '@headlessui/react';
import { useConfirmDialogStore } from '../../../app/App.store';
import { CloseIcon } from '../../../assets/icons/CloseIcon';
import { Button } from '../../atoms/Button/Button';

// export interface DialogProps {
// 	isOpen: boolean;
// 	isClosable: boolean;
// 	title?: string;
// 	content: React.ReactNode;
// }

export const ConfirmDialog = () => {
	const { isOpen, isClosable, title, message, onConfirm, closeConfirmDialog } =
		useConfirmDialogStore();

	return (
		<HuiDialog
			className='fixed inset-0 z-10 flex items-center justify-center bg-neutral-gray-9/50'
			open={isOpen}
			onClose={() => closeConfirmDialog()}
		>
			<HuiDialog.Panel className='HuiPanel flex flex-col rounded bg-neutral-white'>
				<HuiDialog.Title
					as='div'
					className='HuiTitle relative flex flex-row items-center justify-center'
				>
					<h3
						className={
							' h-h-dialog-title py-2 text-h3 font-bold text-primary-dark-2 ' +
							` ${title ? 'border-b border-b-neutral-gray-6' : ''} `
						}
					>
						{title}
					</h3>

					<CloseIcon
						className='absolute top-2 right-2 cursor-pointer'
						size={24}
						onClick={() => closeConfirmDialog()}
					/>
				</HuiDialog.Title>

				<div className='max-h-[75vh] max-w-[75vw] divide-y divide-neutral-gray-6 overflow-auto p-2'>
					<div className='flex flex-col items-center gap-4 '>
						<h4 className='text-h4'>{message}</h4>
						<div className='flex flex-row justify-center gap-2'>
							<Button
								width='medium'
								onClick={() => {
									onConfirm();
									closeConfirmDialog();
								}}
							>
								Xác nhận
							</Button>
							<Button
								variant='secondary'
								width='medium'
								onClick={() => closeConfirmDialog()}
							>
								Hủy
							</Button>
						</div>
					</div>
				</div>
			</HuiDialog.Panel>
		</HuiDialog>
	);
};
