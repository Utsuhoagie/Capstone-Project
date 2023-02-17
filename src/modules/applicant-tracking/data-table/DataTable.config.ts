import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';

export const APPLICANT_TRACKING_TABLE_CONFIGS: TableConfig = {
	width: '98.4%',
};

export const APPLICANT_TRACKING_COLUMN_CONFIGS: ColumnConfigs = {
	NationalId: { width: 140 },
	FullName: { width: 200 },
	Gender: { width: 85 },
	BirthDate: { width: 115 },
	Address: { width: 300 },
	Phone: { width: 125 },
	Email: { width: 170 },
	ExperienceYears: { width: 110 },
	AppliedPosition: { width: 140 },
	AppliedDate: { width: 150 },
	AskingSalary: { width: 130 },
};
