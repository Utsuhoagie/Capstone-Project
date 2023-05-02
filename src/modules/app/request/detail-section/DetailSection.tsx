import { omit } from 'ramda';
import { List } from '../../../../components/organisms/List/List';
import { useRequestStore } from '../Request.store';
import { REQUEST_LIST_ITEM_CONFIGS } from './DetailSection.config';

export const DetailSection = () => {
	const { selectedRequest, displayConfigs } = useRequestStore();

	let filteredListItemConfigs;

	if (selectedRequest) {
		switch (selectedRequest.Type) {
			case 'Raise':
				filteredListItemConfigs = omit(
					['StartLeaveDate', 'EndLeaveDate'],
					REQUEST_LIST_ITEM_CONFIGS
				);
				break;
			case 'Leave':
				filteredListItemConfigs = omit(
					['NewSalary'],
					REQUEST_LIST_ITEM_CONFIGS
				);
				break;
			case 'Other':
				filteredListItemConfigs = omit(
					['NewSalary', 'StartLeaveDate', 'EndLeaveDate'],
					REQUEST_LIST_ITEM_CONFIGS
				);
				break;
		}
	}

	return (
		<div className='flex-1 rounded border border-semantic-section-border p-4 shadow-md'>
			<h3 className='text-h3 font-medium text-secondary-dark-1'>
				{selectedRequest
					? 'Chi tiết yêu cầu'
					: 'Chọn 1 yêu cầu để hiển thị chi tiết...'}
			</h3>

			{selectedRequest && (
				<div className='my-2 w-full rounded-lg border border-neutral-gray-5 bg-neutral-white px-4 py-2'>
					<List
						displayConfigs={displayConfigs}
						listItemConfigs={filteredListItemConfigs}
						data={selectedRequest}
					/>
				</div>
			)}
		</div>
	);
};
