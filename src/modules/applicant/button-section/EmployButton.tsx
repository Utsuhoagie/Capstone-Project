import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/atoms/Button/Button';
import { Applicant } from '../Applicant.interface';
import { useApplicantStore } from '../Applicant.store';

export const EmployButton = () => {
	const navigate = useNavigate();
	const { selectedApplicant } = useApplicantStore();

	return (
		<Button
			width='big'
			onClick={() =>
				navigate(`/app/applicants/employ/${selectedApplicant?.NationalId}`)
			}
		>
			Tuyển
		</Button>
	);
};
