import { Table } from '../../../components/organisms/Table/Table';
import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';
import { Applicant } from '../ApplicantTracking.interface';
import { tableConfig, columnConfigs } from './DataTable.configs';
import dayjs from 'dayjs';

const FAKE_DATA: Applicant[] = [
	{
		NationalId: '01232103',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0135095087',
		AppliedPosition: 'dev',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '01232103',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0135095087',
		AppliedPosition: 'dev',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
];

export const DataTable = () => {
	return (
		<div className='w-full'>
			<Table
				module='applicant-tracking'
				data={FAKE_DATA}
				tableConfig={tableConfig}
				columnConfigs={columnConfigs}
			/>
		</div>
	);
};
