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

export const AcceptButton = () => {
	const { openConfirmDialog } = useConfirmDialogStore();
	const { showToast } = useToastStore();

	const { selectedRequest } = useRequestStore();

	const queryClient = useQueryClient();
	const acceptRequestMutation = useMutation(
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
			width='big'
			onClick={() => {
				openConfirmDialog({
					isClosable: true,
					message: 'Chấp nhận yêu cầu này?',
					onConfirm: () => {
						const req: UpdateRequestStatusRequest = {
							Id: selectedRequest!.Id,
							RequestStatus: RequestStatus.Accepted,
						};

						acceptRequestMutation.mutate(req);
					},
					onSuccess: () => {},
				});
			}}
		>
			Chấp nhận
		</Button>
	);
};
