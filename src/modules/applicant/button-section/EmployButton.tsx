import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/atoms/Button/Button';
import { useApplicantStore } from '../Applicant.store';

export const EmployButton = () => {
	const navigate = useNavigate();
	const selectedApplicant = useApplicantStore(
		(state) => state.selectedApplicant
	);

	return (
		<Button width='big' onClick={() => navigate('/app/applicants/employ')}>
			Tuyển
		</Button>
	);
};
