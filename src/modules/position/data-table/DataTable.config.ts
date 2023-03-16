import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';

export const POSITION_TABLE_CONFIGS: TableConfig = {
	width: '100%',
};

export const POSITION_COLUMN_CONFIGS: ColumnConfigs = {
	Name: { width: 240, isSortable: false },
	ApplicantCount: { width: 140, isSortable: false },
	EmployeeCount: { width: 140, isSortable: false },
};
