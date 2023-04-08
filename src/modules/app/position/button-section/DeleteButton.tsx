import { useMutation, useQueryClient } from 'react-query';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { useTableStore } from '../../../../components/organisms/Table/Table.store';
import { API } from '../../../../config/axios/axios.config';
import { useAuthStore } from '../../../auth/Auth.store';
import { usePositionStore } from '../Position.store';

export const DeleteButton = () => {
	const { accessToken } = useAuthStore();
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { setSelectedRowIndex } = useTableStore();

	const { selectedPosition, setSelectedPosition } = usePositionStore();

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'positions/delete',
		async () => {
			const res = await API.delete(
				`Positions/Delete/${selectedPosition?.Name}`
			);

			if (res.status <= 299) {
				showToast({ state: 'success' });
			} else {
				showToast({ state: 'error' });
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('positions');
				setSelectedPosition(undefined);
				setSelectedRowIndex(undefined);
			},
		}
	);

	function handleDelete() {
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận xóa vị trí này?',
			onConfirm: () => {
				mutation.mutate();
			},
			onSuccess: () => {
				window.alert('aaaaaa');
			},
		});
	}

	return (
		<Button secondary width='big' onClick={handleDelete}>
			Xóa vị trí
		</Button>
	);
};
