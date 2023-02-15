import { DisplayConfigs } from '../../../app/App.display';
import { ListItemConfigs } from './List.interface';
import { ListItem } from './ListItem';

export interface ListProps {
	data: any;
	displayConfigs: DisplayConfigs;
	listItemConfigs: ListItemConfigs;
}

export const List = ({ data, displayConfigs }: ListProps) => {
	return (
		<div className='flex w-full flex-col gap-2 divide-y divide-yellow-900 bg-red-50'>
			{Object.keys(data).map((field) => (
				<ListItem
					key={field}
					displayConfigs={displayConfigs}
					itemData={{ field: field, value: data[field] }}
				/>
			))}
		</div>
	);
};
