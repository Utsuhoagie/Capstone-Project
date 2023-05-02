import { Table } from '../../../../components/organisms/Table/Table';
import {
	REQUEST_TABLE_CONFIGS,
	REQUEST_COLUMN_CONFIGS,
} from './DataTable.config';
import { useRequestStore } from '../Request.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { useNavigate } from 'react-router';

export const DataTable = () => {
	const navigate = useNavigate();

	const { visibleRequests, displayConfigs } = useRequestStore();

	const filledRequests = [
		...visibleRequests,
		...new Array(10 - visibleRequests.length).fill(undefined),
	];

	const subsetColumnConfigs = REQUEST_COLUMN_CONFIGS;

	return (
		<div className='flex flex-col gap-4'>
			<Table
				data={filledRequests}
				displayConfigs={displayConfigs}
				tableConfig={REQUEST_TABLE_CONFIGS}
				columnConfigs={subsetColumnConfigs}
			/>
		</div>
	);
};
