import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/atoms/Button/Button';
import { useEmployeeStore } from '../Employee.store';

export const UpdateButton = () => {
	const navigate = useNavigate();
	const { selectedEmployee } = useEmployeeStore();

	return (
		<Button
			variant='secondary'
			width='big'
			onClick={() =>
				navigate(`/app/employees/update/${selectedEmployee?.NationalId}`)
			}
		>
			Chỉnh sửa hồ sơ
		</Button>
	);
};
