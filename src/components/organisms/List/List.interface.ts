import { DisplayConfigs } from '../../../app/App.display';

export interface ListProps {
	data: any;
	displayConfigs: DisplayConfigs;
	listItemConfigs: ListItemConfigs;
}

export interface ListItemConfigs {
	[field: string]: ListItemConfig;
}

export interface ListItemConfig {}
