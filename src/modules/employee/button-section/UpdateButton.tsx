import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/atoms/Button/Button';
import { useEmployeeStore } from '../Employee.store';

export const UpdateButton = () => {
	const navigate = useNavigate();
	const selectedEmployee = useEmployeeStore((state) => state.selectedEmployee);

	return (
		<Button
			secondary
			width='big'
			onClick={() =>
				navigate(`/app/applicant/update?id=${selectedEmployee?.NationalId}`)
			}
		>
			Chỉnh sửa hồ sơ
		</Button>
	);
};
