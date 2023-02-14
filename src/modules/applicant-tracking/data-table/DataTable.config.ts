import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';

export const APPLICANT_TRACKING_TABLE_CONFIGS: TableConfig = {
	width: 1200,
};

export const APPLICANT_TRACKING_COLUMN_CONFIGS: ColumnConfigs = {
	NationalId: { width: 140 },
	FullName: { width: 280 },
	Gender: { width: 100 },
	BirthDate: { width: 120 },
	Address: { width: 300 },
	Phone: { width: 120 },
	Email: { width: 140 },
	AppliedPosition: { width: 140 },
	AppliedDate: { width: 150 },
	AskingSalary: { width: 150 },
};
