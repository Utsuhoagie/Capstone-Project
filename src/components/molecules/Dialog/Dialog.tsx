import { Dialog as HuiDialog } from '@headlessui/react';
import { useState } from 'react';
import { useDialogStore } from '../../../app/App.store';
import { CloseIcon } from '../../../assets/icons/CloseIcon';

export interface DialogProps {
	isOpen: boolean;
	isClosable: boolean;
	title?: string;
	content: React.ReactNode;
}

export const Dialog = ({ isOpen, isClosable, title, content }: DialogProps) => {
	const closeDialog = useDialogStore((state) => state.closeDialog);

	return (
		<HuiDialog
			className='fixed inset-0 z-10 flex items-center justify-center bg-neutral-gray-9/50'
			open={isOpen}
			onClose={() => closeDialog()}
		>
			<HuiDialog.Panel className='HuiPanel flex flex-col divide-y divide-neutral-gray-6 bg-neutral-white'>
				<HuiDialog.Title
					as='div'
					className='HuiTitle relative flex flex-row items-center justify-center'
				>
					<h2 className='h-dialog-title py-2 font-bold text-primary-dark-2'>
						{title ?? 'adasdas'}
					</h2>
					{isClosable && (
						<CloseIcon
							className='absolute top-2 right-2 cursor-pointer'
							size={24}
							onClick={() => closeDialog()}
						/>
					)}
				</HuiDialog.Title>

				<div className='max-h-[75vh] max-w-[75vw] overflow-auto'>{content}</div>
			</HuiDialog.Panel>
		</HuiDialog>
	);
};
