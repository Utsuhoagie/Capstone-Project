import { useMutation, useQueryClient } from 'react-query';
import { BASE_URL } from '../../../app/App';
import { useToastStore } from '../../../app/App.store';
import { Button } from '../../../components/atoms/Button/Button';
import { useTableStore } from '../../../components/organisms/Table/Table.store';
import { useRefresh } from '../../auth/Auth.hooks';
import { useAuthStore } from '../../auth/Auth.store';
import { useEmployeeStore } from '../Employee.store';

export const DeleteButton = () => {
	const { accessToken } = useAuthStore();
	useRefresh();

	const showToast = useToastStore((state) => state.showToast);
	const setSelectedRowIndex = useTableStore(
		(state) => state.setSelectedRowIndex
	);

	const { selectedEmployee, setSelectedEmployee } = useEmployeeStore();

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'employees/delete',
		async () => {
			const res = await fetch(
				`${BASE_URL}/Employees/Delete?NationalId=${selectedEmployee?.NationalId}`,
				{
					headers: {
						'Authorization': `Bearer ${accessToken}`,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'DELETE',
				}
			);

			if (res.ok) {
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
		mutation.mutate();
	}

	return (
		<Button secondary width='big' onClick={handleDelete}>
			Xóa hồ sơ
		</Button>
	);
};
