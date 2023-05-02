import {
	ColumnConfigs,
	TableConfig,
} from '../../../../components/organisms/Table/Table.interface';

export const REQUEST_TABLE_CONFIGS: TableConfig = {
	width: 'fit-content',
};

export const REQUEST_COLUMN_CONFIGS: ColumnConfigs = {
	EmployeeFullName: { width: 200, isSortable: true },
	Type: { width: 200, isSortable: true },
	Title: { width: 240, isSortable: false },
	// Description: { width: 320, isSortable: false },
	RequestStatus: { width: 180, isSortable: true },
	CreatedDate: { width: 180, isSortable: true },
	// NewSalary: { width: 180, isSortable: true },
	// StartLeaveDate: { width: 180, isSortable: true },
	// StartLeaveDate: { width: 180, isSortable: true },
};
