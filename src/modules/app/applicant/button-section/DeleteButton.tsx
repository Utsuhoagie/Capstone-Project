import { useMutation, useQueryClient } from 'react-query';
import { BASE_URL } from '../../../../app/App';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { useTableStore } from '../../../../components/organisms/Table/Table.store';
import { useRefresh } from '../../../auth/Auth.hooks';
import { useAuthStore } from '../../../auth/Auth.store';
import { useApplicantStore } from '../Applicant.store';

export const DeleteButton = () => {
	const { accessToken } = useAuthStore();
	useRefresh();

	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { setSelectedRowIndex } = useTableStore();

	const { selectedApplicant, setSelectedApplicant } = useApplicantStore();

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'applicants/delete',
		async () => {
			const res = await fetch(
				`${BASE_URL}/Applicants/Delete/${selectedApplicant?.NationalId}`,
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
				queryClient.invalidateQueries('applicants');
				setSelectedApplicant(undefined);
				setSelectedRowIndex(undefined);
			},
		}
	);

	function handleDelete() {
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận xóa hồ sơ ứng viên này?',
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
			Xóa hồ sơ
		</Button>
	);
};
