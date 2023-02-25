import React from 'react';

export interface TableConfig extends React.ComponentPropsWithRef<'table'> {
	// width?: '100%' | number;
	// onRowSelected: (index: number) => void;
}

// export interface TableConfig {
// 	width: '100%' | number;
// }

/** Specify a ColumnConfig for each column in table */
export interface ColumnConfigs {
	[column: string]: ColumnConfig;
}

export interface ColumnConfig {
	width?: number;
	isSortable?: boolean;
}
