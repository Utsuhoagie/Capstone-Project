import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';

export const EMPLOYEE_TABLE_CONFIGS: TableConfig = {
	width: '100%',
};

export const EMPLOYEE_COLUMN_CONFIGS: ColumnConfigs = {
	NationalId: { width: 140, isSortable: false },
	FullName: { width: 220, isSortable: true },
	Gender: { width: 110, isSortable: false },
	BirthDate: { width: 115, isSortable: true },
	Address: { width: 300, isSortable: false },
	Phone: { width: 140, isSortable: false },
	Email: { width: 220, isSortable: false },
	ExperienceYears: { width: 160, isSortable: true },
	Position: { width: 180, isSortable: true },
	EmployedDate: { width: 145, isSortable: true },
	Salary: { width: 130, isSortable: true },
	StartHour: { width: 110, isSortable: true },
	EndHour: { width: 110, isSortable: true },
};
