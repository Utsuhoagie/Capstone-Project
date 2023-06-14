import { useQuery } from 'react-query';
import { createImageUrl } from '../../file/File.utils';
import PLACEHOLDER_PERSON_IMAGE from '../../../../assets/img/PLACEHOLDER_PERSON_IMAGE.png';
import { API } from '../../../../config/axios/axios.config';
import { Employee } from '../../employee/Employee.interface';

interface DailyEmployeePopupProps {
	employee: Employee;
}

export const DailyEmployeePopup = ({ employee }: DailyEmployeePopupProps) => {
	const hasImage = Boolean(employee.ImageFileName);
	const employeeImageQuery = useQuery(
		['files', { employeeNationalId: employee.NationalId }],
		async () => {
			const res = await API.get(
				`Files/Image/Employees/${employee.ImageFileName}`,
				{ responseType: 'blob' }
			);

			return createImageUrl(res.data);
		},
		{
			enabled: hasImage,
		}
	);

	if (!hasImage) {
		return <></>;
	}

	return (
		<div className='absolute -bottom-36 z-50 max-w-[250px]'>
			<img
				// className='h-h-image-section'
				className='w-full'
				src={employeeImageQuery.data}
			/>
		</div>
	);
};
