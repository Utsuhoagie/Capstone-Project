import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/atoms/Button/Button';
import { useApplicantStore } from '../Applicant.store';

export const UpdateButton = () => {
	const navigate = useNavigate();
	const selectedApplicant = useApplicantStore(
		(state) => state.selectedApplicant
	);

	return (
		<Button
			secondary
			width='big'
			onClick={() =>
				navigate(`/app/applicant/update?id=${selectedApplicant?.NationalId}`)
			}
		>
			Chỉnh sửa hồ sơ
		</Button>
	);
};
