import { Table } from '../../../components/organisms/Table/Table';
import {
	APPLICANT_TRACKING_TABLE_CONFIGS,
	APPLICANT_TRACKING_COLUMN_CONFIGS,
} from './DataTable.config';
import { DisplayConfigs } from '../../../app/App.display';
import {
	APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
	APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
	APPLICANT_TRACKING_FORMATTERS,
	APPLICANT_TRACKING_LABELLERS,
	APPLICANT_TRACKING_MAPPERS,
} from '../ApplicantTracking.display';
import { useApplicantTrackingStore } from '../ApplicantTracking.store';
import { ColumnConfigs } from '../../../components/organisms/Table/Table.interface';
import { omit } from 'ramda';
import { Button } from '../../../components/atoms/Button/Button';
import { useNavigate } from 'react-router';

export const DataTable = () => {
	const navigate = useNavigate();

	const displayConfigs = useApplicantTrackingStore(
		(state) => state.displayConfigs
	);
	const applicants = useApplicantTrackingStore((state) => state.applicants);

	const subsetColumnConfigs = omit(
		['NationalId', 'Address'],
		APPLICANT_TRACKING_COLUMN_CONFIGS
	);

	function handleClickCreate() {
		navigate('create');
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-row gap-4'>
				<Button width='small' onClick={handleClickCreate}>
					Thêm
				</Button>
				<Button secondary width='small'>
					Bộ Lọc
				</Button>
			</div>
			<Table
				data={applicants}
				displayConfigs={displayConfigs}
				tableConfig={APPLICANT_TRACKING_TABLE_CONFIGS}
				columnConfigs={subsetColumnConfigs}
			/>
		</div>
	);
};
