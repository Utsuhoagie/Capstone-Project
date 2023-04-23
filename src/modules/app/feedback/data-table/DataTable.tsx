import { Table } from '../../../../components/organisms/Table/Table';
import {
	FEEDBACK_TABLE_CONFIGS,
	FEEDBACK_COLUMN_CONFIGS,
} from './DataTable.config';
import { useFeedbackStore } from '../Feedback.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { useNavigate } from 'react-router';

export const DataTable = () => {
	const navigate = useNavigate();

	const { visibleFeedbacks, displayConfigs } = useFeedbackStore();

	const filledFeedbacks = [
		...visibleFeedbacks,
		...new Array(10 - visibleFeedbacks.length).fill(undefined),
	];

	const subsetColumnConfigs = FEEDBACK_COLUMN_CONFIGS;

	return (
		<div className='flex flex-col gap-4'>
			<Table
				data={filledFeedbacks}
				displayConfigs={displayConfigs}
				tableConfig={FEEDBACK_TABLE_CONFIGS}
				columnConfigs={subsetColumnConfigs}
			/>
		</div>
	);
};
