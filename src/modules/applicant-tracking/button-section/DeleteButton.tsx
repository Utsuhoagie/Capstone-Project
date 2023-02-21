import { useMutation, useQueryClient } from 'react-query';
import { useToastStore } from '../../../app/App.store';
import { Button } from '../../../components/atoms/Button/Button';
import { Applicant } from '../ApplicantTracking.interface';
import { useApplicantTrackingStore } from '../ApplicantTracking.store';

export const DeleteButton = () => {
	const showToast = useToastStore((state) => state.showToast);

	const selectedApplicant = useApplicantTrackingStore(
		(state) => state.selectedApplicant
	);

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'applicant-tracking/delete',
		async () => {
			const res = await fetch(
				`https://localhost:5000/api/ApplicantTracking?NationalId=${selectedApplicant?.NationalId}`,
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
				queryClient.invalidateQueries('applicant-tracking');
			},
		}
	);

	function handleDelete() {
		mutation.mutate();
	}

	return (
		<Button width='medium' onClick={handleDelete}>
			Xóa hồ sơ
		</Button>
	);
};
