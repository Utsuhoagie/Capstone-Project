import { Module } from '../../../app/App.modules';

export interface TableProps {
	module: Module;
	data: any[];
	tableConfig: TableConfig;
	columnConfigs: ColumnConfigs;
}

export interface ModuleContext {
	module: Module;
}

export interface TableConfig {
	width?: '100%' | number;
}

/** Specify a ColumnConfig for each column in table */
export interface ColumnConfigs {
	[column: string]: ColumnConfig;
}

export interface ColumnConfig {
	header: string;
	width?: number;

	/** If 'mapped' or 'formatted',
	 * MUST include values
	 * in MAPPER / FORMATTER
	 */
	displayMode: 'mapped' | 'formatted' | 'normal';
}
