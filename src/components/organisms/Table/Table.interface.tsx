export interface TableProps {
	module: string;
	data: any[];
	tableConfig: TableConfig;
	columnConfigs: ColumnConfigs;
}

export interface TableConfig {
	width?: '100%' | number;
}

export interface ColumnConfigs {
	// for each field
	[column: string]: ColumnConfig;
}

export interface ColumnConfig {
	width?: number;
	displayType?: 'mapped' | 'formatted' | 'none';
	formatter?: (value: any) => string;
}
