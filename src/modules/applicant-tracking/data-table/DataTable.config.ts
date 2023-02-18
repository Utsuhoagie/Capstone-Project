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
	Gender: { width: 80 },
	BirthDate: { width: 105 },
	Address: { width: 300 },
	Phone: { width: 120 },
	Email: { width: 170 },
	ExperienceYears: { width: 95 },
	AppliedPosition: { width: 180 },
	AppliedDate: { width: 145 },
	AskingSalary: { width: 130 },
};
