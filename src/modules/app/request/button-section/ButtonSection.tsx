import { useTableStore } from '../../../../components/organisms/Table/Table.store';
import { AcceptButton } from './AcceptButton';
import { useRequestStore } from '../Request.store';
import { RequestStatus } from '../Request.interface';
import { RejectButton } from './RejectButton';

export const ButtonSection = () => {
	const selectedRowIndex = useTableStore((state) => state.selectedRowIndex);
	const { selectedRequest } = useRequestStore();

	return (
		<div
			className={
				' flex w-fit flex-col items-center gap-2 rounded border border-secondary-dark-1 p-4 shadow-md ' +
				`${
					selectedRowIndex !== undefined &&
					selectedRequest?.RequestStatus == RequestStatus.Pending
						? ''
						: ' hidden '
				}`
			}
		>
			<AcceptButton />
			<RejectButton />
		</div>
	);
};
