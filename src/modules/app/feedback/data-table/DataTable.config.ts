import {
	ColumnConfigs,
	TableConfig,
} from '../../../../components/organisms/Table/Table.interface';

export const FEEDBACK_TABLE_CONFIGS: TableConfig = {
	width: 'fit-content',
};

export const FEEDBACK_COLUMN_CONFIGS: ColumnConfigs = {
	Title: { width: 320, isSortable: false },
	Description: { width: 400, isSortable: false },
	CreatedDate: { width: 180, isSortable: true },
	EmployeeFullName: { width: 200, isSortable: true },
};
