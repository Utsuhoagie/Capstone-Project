import React from 'react';
import {
	DisplayConfigs,
	getDisplayForFieldValue,
	getLabelForField,
} from '../../../app/App.display';
import { EmptyText } from '../../atoms/EmptyText/EmptyText';
import { Label } from '../../atoms/Input/Label';

interface ListItemProps {
	displayConfigs: DisplayConfigs;
	itemData: {
		field: string;
		value: any;
	};
}

export const ListItem = ({
	displayConfigs,
	itemData: { field, value },
}: ListItemProps) => {
	const label = getLabelForField({
		labellers: displayConfigs.labellers,
		field,
	});
	const displayValue = getDisplayForFieldValue({
		displayConfigs,
		field,
		value,
	});

	return (
		<div className='flex w-full flex-row items-center justify-between'>
			<Label label={label} />
			<p>{displayValue === undefined ? <EmptyText /> : displayValue}</p>
		</div>
	);
};
