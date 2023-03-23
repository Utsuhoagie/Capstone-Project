import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/atoms/Button/Button';
import { Applicant } from '../Applicant.interface';
import { useApplicantStore } from '../Applicant.store';

export const UpdateButton = () => {
	const navigate = useNavigate();
	const { selectedApplicant } = useApplicantStore();

	return (
		<Button
			secondary
			width='big'
			onClick={() =>
				navigate(`/app/applicants/update/${selectedApplicant?.NationalId}`)
			}
		>
			Chỉnh sửa hồ sơ
		</Button>
	);
};
