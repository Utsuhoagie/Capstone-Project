import QueryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/atoms/Button/Button';
import { usePositionStore } from '../Position.store';

export const FindApplicantsButton = () => {
	const navigate = useNavigate();
	const { selectedPosition } = usePositionStore();
	const params = QueryString.stringify({
		AppliedPositionName: selectedPosition?.Name,
	});

	return (
		<Button
			variant='primary'
			width='big'
			onClick={() => navigate(`/app/applicants?${params}`)}
		>
			Xem các ứng viên
		</Button>
	);
};
