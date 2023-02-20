import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';

export const APPLICANT_TRACKING_TABLE_CONFIGS: TableConfig = {
	width: '100%',
};

export const APPLICANT_TRACKING_COLUMN_CONFIGS: ColumnConfigs = {
	NationalId: { width: 140 },
	FullName: { width: 220 },
	Gender: { width: 80 },
	BirthDate: { width: 115 },
	Address: { width: 300 },
	Phone: { width: 120 },
	Email: { width: 220 },
	ExperienceYears: { width: 100 },
	AppliedPosition: { width: 180 },
	AppliedDate: { width: 145 },
	AskingSalary: { width: 130 },
};
