import { useEffect } from 'react';
import { useToastStore } from '../../../app/App.store';

export const Toast = () => {
	const { isOpen, state, message, hideToast } = useToastStore();

	const isSuccess = state === 'success';
	const isError = state === 'error';

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				hideToast();
			}, 5000);
		}
	}, [isOpen]);

	return (
		<div
			className={
				' fixed right-4 bottom-4 max-h-h-toast max-w-[240px] rounded border-2 p-2 ' +
				`${isOpen ? ' flex flex-col items-start ' : ' hidden '}` +
				`${
					isSuccess
						? ' border-state-success-normal bg-state-success-bright-2 '
						: isError
						? ' border-state-error-normal bg-state-error-bright-2 '
						: ''
				}`
			}
		>
			{isSuccess && <p className='font-semibold'>Thành công</p>}
			{isError && <p className='font-semibold'>Thất bại</p>}
			{message && <p>{message}</p>}
		</div>
	);
};
