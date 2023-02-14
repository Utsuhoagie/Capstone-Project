export interface TableConfig {
	width?: '100%' | number;
	// onRowSelected: (index: number) => void;
}

/** Specify a ColumnConfig for each column in table */
export interface ColumnConfigs {
	[column: string]: ColumnConfig;
}

export interface ColumnConfig {
	width?: number;
}
