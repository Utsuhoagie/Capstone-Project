import { Table } from '../../../components/organisms/Table/Table';
import {
	APPLICANT_TRACKING_TABLE_CONFIGS,
	APPLICANT_TRACKING_COLUMN_CONFIGS,
} from './DataTable.config';
import { useApplicantTrackingStore } from '../ApplicantTracking.store';
import { omit } from 'ramda';
import { Button } from '../../../components/atoms/Button/Button';
import { useNavigate } from 'react-router';

export const DataTable = () => {
	const navigate = useNavigate();

	const { allApplicants, applicantsOnPage, displayConfigs } =
		useApplicantTrackingStore();

	const filledApplicants = [
		...applicantsOnPage,
		...new Array(10 - applicantsOnPage.length).fill(undefined),
	];

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
				data={filledApplicants}
				displayConfigs={displayConfigs}
				tableConfig={APPLICANT_TRACKING_TABLE_CONFIGS}
				columnConfigs={subsetColumnConfigs}
			/>
		</div>
	);
};
