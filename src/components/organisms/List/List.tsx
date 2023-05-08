import { DisplayConfigs } from '../../../app/App.display';
import { Module } from '../../../app/App.modules';
import { ListItemConfigs } from './List.interface';
import { ListItem } from './ListItem';

export interface ListProps {
	data: any;
	module: Module;
	displayConfigs: DisplayConfigs;
	listItemConfigs: ListItemConfigs;
}

export const List = ({
	data,
	module,
	displayConfigs,
	listItemConfigs,
}: ListProps) => {
	return (
		<div className='flex w-full flex-col divide-y divide-neutral-gray-5'>
			{Object.keys(listItemConfigs).map((field) => (
				<ListItem
					key={field}
					module={module}
					displayConfigs={displayConfigs}
					itemData={{ field: field, value: data[field] }}
				/>
			))}
		</div>
	);
};
