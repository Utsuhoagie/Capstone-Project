import { useMutation, useQueryClient } from 'react-query';
import { BASE_URL } from '../../../app/App';
import { useToastStore } from '../../../app/App.store';
import { Button } from '../../../components/atoms/Button/Button';
import { usePositionStore } from '../Position.store';

export const DeleteButton = () => {
	const showToast = useToastStore((state) => state.showToast);

	const selectedPosition = usePositionStore((state) => state.selectedPosition);

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'positions/delete',
		async () => {
			const res = await fetch(
				`${BASE_URL}/Positions/Delete?Name=${selectedPosition?.Name}`,
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
				queryClient.invalidateQueries('position');
			},
		}
	);

	function handleDelete() {
		mutation.mutate();
	}

	return (
		<Button secondary width='big' onClick={handleDelete}>
			Xóa vị trí
		</Button>
	);
};
