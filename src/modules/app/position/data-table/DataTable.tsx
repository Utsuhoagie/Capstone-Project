import { Table } from '../../../components/organisms/Table/Table';
import {
	POSITION_TABLE_CONFIGS,
	POSITION_COLUMN_CONFIGS,
} from './DataTable.config';
import { usePositionStore } from '../Position.store';
import { Button } from '../../../components/atoms/Button/Button';
import { useNavigate } from 'react-router';

export const DataTable = () => {
	const navigate = useNavigate();

	const { visiblePositions, displayConfigs } = usePositionStore();

	const filledPositions = [
		...visiblePositions,
		...new Array(10 - visiblePositions.length).fill(undefined),
	];

	const subsetColumnConfigs = POSITION_COLUMN_CONFIGS;
	function handleClickCreate() {
		navigate('create');
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-row gap-4'>
				<Button width='small' onClick={handleClickCreate}>
					Thêm
				</Button>
			</div>
			<Table
				data={filledPositions}
				displayConfigs={displayConfigs}
				tableConfig={POSITION_TABLE_CONFIGS}
				columnConfigs={subsetColumnConfigs}
			/>
		</div>
	);
};
