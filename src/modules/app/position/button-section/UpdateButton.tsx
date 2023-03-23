import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/atoms/Button/Button';
import { usePositionStore } from '../Position.store';

export const UpdateButton = () => {
	const navigate = useNavigate();
	const { selectedPosition } = usePositionStore();

	return (
		<Button
			secondary
			width='big'
			onClick={() =>
				navigate(`/app/positions/update/${selectedPosition?.Name}`)
			}
		>
			Chỉnh sửa vị trí
		</Button>
	);
};
