import { useQuery } from 'react-query';
import { List } from '../../../../components/organisms/List/List';
import { API } from '../../../../config/axios/axios.config';
import { createImageUrl } from '../../file/File.utils';
import { useApplicantStore } from '../Applicant.store';
import { APPLICANT_LIST_ITEM_CONFIGS } from './DetailSection.config';
import PLACEHOLDER_PERSON_IMAGE from '../../../../assets/img/PLACEHOLDER_PERSON_IMAGE.png';

export const DetailSection = () => {
	const { selectedApplicant, displayConfigs } = useApplicantStore();
	const hasImage = Boolean(
		selectedApplicant && selectedApplicant.ImageFileName
	);

	const applicantImageQuery = useQuery(
		['files', { applicant: selectedApplicant }],
		async () => {
			const res = await API.get(
				`Files/Image/Applicants/${selectedApplicant?.ImageFileName}`,
				{ responseType: 'blob' }
			);

			return createImageUrl(res.data);
		},
		{
			enabled: hasImage,
		}
	);

	return (
		<div className='flex-1 rounded border border-semantic-section-border p-4 shadow-md'>
			<h3 className='text-h3 font-medium text-secondary-dark-1'>
				{selectedApplicant
					? 'Chi tiết hồ sơ ứng tuyển'
					: 'Chọn 1 hồ sơ để hiển thị chi tiết...'}
			</h3>

			{selectedApplicant && (
				<div className='flex flex-row items-start justify-between gap-4 p-2'>
					<div className='w-w-list-section rounded-lg border border-neutral-gray-5 bg-neutral-white px-4 py-2'>
						<List
							module='Applicants'
							data={selectedApplicant}
							displayConfigs={displayConfigs}
							listItemConfigs={APPLICANT_LIST_ITEM_CONFIGS}
						/>
					</div>

					<div className='rounded-lg border border-neutral-gray-5 bg-neutral-white p-4'>
						<img
							// className='h-h-image-section'
							className='w-[400px]'
							src={
								hasImage ? applicantImageQuery.data : PLACEHOLDER_PERSON_IMAGE
							}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
