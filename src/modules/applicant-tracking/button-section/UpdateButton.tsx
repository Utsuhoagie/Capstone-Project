import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/atoms/Button/Button';
import { useApplicantTrackingStore } from '../ApplicantTracking.store';

export const UpdateButton = () => {
	const navigate = useNavigate();
	const selectedApplicant = useApplicantTrackingStore(
		(state) => state.selectedApplicant
	);

	return (
		<Button
			secondary
			width='big'
			onClick={() =>
				navigate(
					`/app/applicant-tracking/update?id=${selectedApplicant?.NationalId}`
				)
			}
		>
			Chỉnh sửa hồ sơ
		</Button>
	);
};
