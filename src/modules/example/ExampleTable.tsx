import { Table } from '../../components/organisms/Table/Table';
import {
	ColumnConfigs,
	TableConfig,
} from '../../components/organisms/Table/Table.interface';

interface Person {
	fullName: string;
	age: number;
	position: string;
	isCringe: boolean;
}

const DEFAULT_DATA: Person[] = [
	{
		fullName: 'Foo',
		age: 20,
		position: 'dev',
		isCringe: true,
	},
	{
		fullName: 'Barry',
		age: 25,
		position: 'marketing',
		isCringe: false,
	},
	{
		fullName: 'Alice',
		age: 30,
		position: 'finance',
		isCringe: true,
	},
];

export const ExampleTable = () => {
	const tableConfig: TableConfig = {
		width: '100%',
	};

	const columnConfigs: ColumnConfigs = {
		fullName: {
			header: 'Full Name',
			displayType: 'normal',
		},
		age: {
			header: 'Age',
			displayType: 'formatted',
			formatter: (value) => `${value} years old`,
		},
		position: {
			header: 'Position',
			displayType: 'mapped',
		},
		isCringe: {
			header: 'Is Cringe',
			displayType: 'mapped',
			width: 500,
		},
	};

	return (
		<div>
			ExampleTable
			<Table
				module='example'
				data={DEFAULT_DATA}
				tableConfig={tableConfig}
				columnConfigs={columnConfigs}
			/>
		</div>
	);
};
