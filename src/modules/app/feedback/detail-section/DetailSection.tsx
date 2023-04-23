import { List } from '../../../../components/organisms/List/List';
import { useFeedbackStore } from '../Feedback.store';
import { FEEDBACK_LIST_ITEM_CONFIGS } from './DetailSection.config';

export const DetailSection = () => {
	const { selectedFeedback, displayConfigs } = useFeedbackStore();

	return (
		<div className='flex-1 rounded border border-semantic-section-border p-4 shadow-md'>
			<h3 className='text-h3 font-medium text-secondary-dark-1'>
				{selectedFeedback
					? 'Chi tiết thư góp ý'
					: 'Chọn 1 thư góp ý để hiển thị chi tiết...'}
			</h3>

			{selectedFeedback && (
				<div className='flex flex-row items-stretch gap-4 p-2'>
					<p className='w-full rounded-lg border border-neutral-gray-5 bg-neutral-white px-4 py-2'>
						{selectedFeedback.Description}
					</p>
				</div>
			)}
		</div>
	);
};
