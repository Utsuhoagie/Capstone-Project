import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { API } from '../../../../config/axios/axios.config';
import {
	RequestStatus,
	UpdateRequestStatusRequest,
} from '../Request.interface';
import { useRequestStore } from '../Request.store';

export const RejectButton = () => {
	const { openConfirmDialog } = useConfirmDialogStore();
	const { showToast } = useToastStore();

	const { selectedRequest } = useRequestStore();

	const queryClient = useQueryClient();
	const rejectRequestMutation = useMutation(
		'Requests/UpdateStatus',
		async (req: UpdateRequestStatusRequest) => {
			const res = await API.put(`Requests/UpdateRequestStatus`, req);

			showToast({ state: 'success' });
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	return (
		<Button
			variant='secondary'
			width='big'
			onClick={() => {
				openConfirmDialog({
					isClosable: true,
					message: 'Từ chối yêu cầu này?',
					onConfirm: () => {
						const req: UpdateRequestStatusRequest = {
							Id: selectedRequest!.Id,
							RequestStatus: RequestStatus.Rejected,
						};

						rejectRequestMutation.mutate(req);
					},
					onSuccess: () => {},
				});
			}}
		>
			Từ chối
		</Button>
	);
};
