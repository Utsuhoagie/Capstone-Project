import { Table } from '../../../components/organisms/Table/Table';
import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';
import { Applicant } from '../ApplicantTracking.interface';
import { tableConfig, columnConfigs } from './DataTable.configs';
import dayjs from 'dayjs';
import { DisplayConfigs } from '../../../app/App.display';
import {
	APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
	APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
	APPLICANT_TRACKING_FORMATTERS,
	APPLICANT_TRACKING_LABELLERS,
	APPLICANT_TRACKING_MAPPERS,
} from '../ApplicantTracking.display';

const FAKE_DATA: Applicant[] = [
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0135095087',
		AppliedPosition: 'developer',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0135095087',
		AppliedPosition: 'hr',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
];

export const DataTable = () => {
	const displayConfigs: DisplayConfigs = {
		labellers: APPLICANT_TRACKING_LABELLERS,
		displayModeMappers: APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
		mappers: APPLICANT_TRACKING_MAPPERS,
		formattableFieldMappers: APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
		formatters: APPLICANT_TRACKING_FORMATTERS,
	};
	return (
		<div className='w-full'>
			<Table
				data={FAKE_DATA}
				displayConfigs={displayConfigs}
				tableConfig={tableConfig}
				columnConfigs={columnConfigs}
			/>
		</div>
	);
};
