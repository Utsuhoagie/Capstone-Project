import React from 'react';
import {
	DisplayConfigs,
	getDisplayForFieldValue,
	getLabelForField,
} from '../../../app/App.display';
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
		<div className='flex w-full flex-row items-end justify-between gap-2'>
			<Label label={label} />
			{displayValue}
		</div>
	);
};
