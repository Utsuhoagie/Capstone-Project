import { useQuery } from 'react-query';
import { List } from '../../../../components/organisms/List/List';
import { API } from '../../../../config/axios/axios.config';
import { createImageUrl } from '../../file/File.utils';
import { useEmployeeStore } from '../Employee.store';
import { EMPLOYEE_LIST_ITEM_CONFIGS } from './DetailSection.config';
import PLACEHOLDER_PERSON_IMAGE from '../../../../assets/img/PLACEHOLDER_PERSON_IMAGE.png';

export const DetailSection = () => {
	const { selectedEmployee, displayConfigs } = useEmployeeStore();

	const hasImage = Boolean(selectedEmployee && selectedEmployee.ImageFileName);

	const employeeImageQuery = useQuery(
		['files', { applicant: selectedEmployee }],
		async () => {
			const res = await API.get(
				`Files/Image/Employees/${selectedEmployee?.ImageFileName}`,
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
				{selectedEmployee
					? 'Chi tiết hồ sơ nhân viên'
					: 'Chọn 1 hồ sơ để hiển thị chi tiết...'}
			</h3>

			{selectedEmployee && (
				<div className='flex flex-row items-start justify-between gap-4 p-2'>
					<div className='w-w-list-section rounded-lg border border-neutral-gray-5 bg-neutral-white px-4 py-2'>
						<List
							module='Employees'
							data={selectedEmployee}
							displayConfigs={displayConfigs}
							listItemConfigs={EMPLOYEE_LIST_ITEM_CONFIGS}
						/>
					</div>

					<div className='rounded-lg border border-neutral-gray-5 bg-neutral-white p-4'>
						<img
							// className='h-h-image-section'
							className='w-[400px]'
							src={
								hasImage ? employeeImageQuery.data : PLACEHOLDER_PERSON_IMAGE
							}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
