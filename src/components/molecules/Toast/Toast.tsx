import { useEffect } from 'react';
import { useToastStore } from '../../../app/App.store';

export const Toast = () => {
	const { isOpen, state, hideToast } = useToastStore();

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
				' fixed right-4 bottom-4 max-h-h-toast max-w-[240px] border p-2 ' +
				`${isOpen ? '' : ' hidden '}` +
				`${
					isSuccess
						? ' border-state-success-dark bg-state-success-bright-1 '
						: isError
						? ' border-state-error-dark bg-state-error-bright-1 '
						: ''
				}`
			}
		>
			{isSuccess && <p>Thành công</p>}
			{isError && <p>Thất bại</p>}
		</div>
	);
};
