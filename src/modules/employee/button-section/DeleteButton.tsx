import { useMutation, useQueryClient } from 'react-query';
import { useToastStore } from '../../../app/App.store';
import { Button } from '../../../components/atoms/Button/Button';
import { useEmployeeStore } from '../Employee.store';

export const DeleteButton = () => {
	const showToast = useToastStore((state) => state.showToast);

	const selectedEmployee = useEmployeeStore((state) => state.selectedEmployee);

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'employees/delete',
		async () => {
			const res = await fetch(
				`https://localhost:5000/api/Employees/Delete?NationalId=${selectedEmployee?.NationalId}`,
				{
					headers: {
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
