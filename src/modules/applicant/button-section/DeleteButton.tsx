import { useMutation, useQueryClient } from 'react-query';
import { useToastStore } from '../../../app/App.store';
import { Button } from '../../../components/atoms/Button/Button';
import { Applicant } from '../Applicant.interface';
import { useApplicantStore } from '../Applicant.store';

export const DeleteButton = () => {
	const showToast = useToastStore((state) => state.showToast);

	const selectedApplicant = useApplicantStore(
		(state) => state.selectedApplicant
	);

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'applicants/delete',
		async () => {
			const res = await fetch(
				`https://localhost:5000/api/Applicants/Delete?NationalId=${selectedApplicant?.NationalId}`,
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
				queryClient.invalidateQueries('applicant');
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
