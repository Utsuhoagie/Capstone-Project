import { List } from '../../../../components/organisms/List/List';
import { useApplicantStore } from '../Applicant.store';
import { APPLICANT_LIST_ITEM_CONFIGS } from './DetailSection.config';

export const DetailSection = () => {
	const { selectedApplicant, displayConfigs } = useApplicantStore();

	return (
		<div className='flex-1 rounded border border-semantic-section-border p-4 shadow-md'>
			<h3 className='text-h3 font-medium text-secondary-dark-1'>
				{selectedApplicant
					? 'Chi tiết hồ sơ ứng tuyển'
					: 'Chọn 1 hồ sơ để hiển thị chi tiết...'}
			</h3>

			{selectedApplicant && (
				<div className='flex flex-row items-stretch gap-4 p-2'>
					<div className='w-w-list-section rounded-lg border border-neutral-gray-5 bg-neutral-white px-4 py-2'>
						<List
							data={selectedApplicant}
							displayConfigs={displayConfigs}
							listItemConfigs={APPLICANT_LIST_ITEM_CONFIGS}
						/>
					</div>

					<div className='flex-1 rounded-lg border border-neutral-gray-5 bg-neutral-white p-4'>
						<div className='h-h-image-section w-full bg-red-300'></div>
					</div>
				</div>
			)}
		</div>
	);
};
