import { DisplayConfigs } from '../../../app/App.display';

export interface TableProps {
	data: any[];
	displayConfigs: DisplayConfigs;
	tableConfig: TableConfig;
	columnConfigs: ColumnConfigs;
}

export interface TableConfig {
	width?: '100%' | number;
}

/** Specify a ColumnConfig for each column in table */
export interface ColumnConfigs {
	[column: string]: ColumnConfig;
}

export interface ColumnConfig {
	width?: number;
}
