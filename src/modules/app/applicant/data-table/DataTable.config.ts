import {
	ColumnConfigs,
	TableConfig,
} from '../../../../components/organisms/Table/Table.interface';

export const APPLICANT_TABLE_CONFIGS: TableConfig = {
	width: 'full',
};

export const APPLICANT_COLUMN_CONFIGS: ColumnConfigs = {
	NationalId: { width: 140, isSortable: false },
	FullName: { width: 220, isSortable: true },
	Gender: { width: 110, isSortable: false },
	BirthDate: { width: 115, isSortable: true },
	Address: { width: 300, isSortable: false },
	Phone: { width: 140, isSortable: false },
	Email: { width: 220, isSortable: false },
	ExperienceYears: { width: 160, isSortable: true },
	AppliedPositionName: { width: 180, isSortable: true },
	AppliedDate: { width: 145, isSortable: true },
	AskingSalary: { width: 160, isSortable: true },
};
