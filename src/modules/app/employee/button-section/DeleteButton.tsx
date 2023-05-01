import { useMutation, useQueryClient } from 'react-query';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { useTableStore } from '../../../../components/organisms/Table/Table.store';
import { API } from '../../../../config/axios/axios.config';
import { useAuthStore } from '../../../auth/Auth.store';
import { useEmployeeStore } from '../Employee.store';

export const DeleteButton = () => {
	const { accessToken } = useAuthStore();
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { setSelectedRowIndex } = useTableStore();

	const { selectedEmployee, setSelectedEmployee } = useEmployeeStore();

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'employees/delete',
		async () => {
			const res = await API.delete(
				`Employees/Delete/${selectedEmployee?.NationalId}`
			);

			if (res.status <= 299) {
				showToast({ state: 'success' });
			} else {
				showToast({ state: 'error' });
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('employees');
				setSelectedEmployee(undefined);
				setSelectedRowIndex(undefined);
			},
		}
	);

	function handleDelete() {
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận xóa hồ sơ nhân viên này?',
			onConfirm: () => {
				mutation.mutate();
			},
			onSuccess: () => {
				window.alert('aaaaaa');
			},
		});
	}

	return (
		<Button variant='secondary' width='big' onClick={handleDelete}>
			Xóa hồ sơ
		</Button>
	);
};
