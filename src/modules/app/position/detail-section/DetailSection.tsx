import { List } from '../../../../components/organisms/List/List';
import { usePositionStore } from '../Position.store';
import { POSITION_LIST_ITEM_CONFIGS } from './DetailSection.config';

export const DetailSection = () => {
	const { selectedPosition, displayConfigs } = usePositionStore();

	return (
		<div className='flex-1 rounded border border-semantic-section-border p-4 shadow-md'>
			<h3 className='text-h3 font-medium text-secondary-dark-1'>
				{selectedPosition
					? 'Chi tiết vị trí'
					: 'Chọn 1 vị trí để hiển thị chi tiết...'}
			</h3>

			{selectedPosition && (
				<div className='flex flex-row items-stretch gap-4 p-2'>
					<div className='w-w-list-section rounded-lg border border-neutral-gray-5 bg-neutral-white px-4 py-2'>
						<List
							data={selectedPosition}
							displayConfigs={displayConfigs}
							listItemConfigs={POSITION_LIST_ITEM_CONFIGS}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
