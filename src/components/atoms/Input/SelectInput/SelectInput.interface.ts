import { DisplayConfigs } from '../../../../app/App.display';

export interface SelectOptionPair {
	value: any;
	display: string | undefined;
}

export interface SelectInputProps
	extends React.ComponentPropsWithRef<'select'> {
	name: string;
	label?: string;
	width: 'full' | 'medium';
	optionPairs: SelectOptionPair[];
	displayConfigs: DisplayConfigs;
}

export interface SelectInputSingleProps extends SelectInputProps {
	hasError?: boolean;
	optionPairs: SelectOptionPair[];
	selectedValue: any;
}

export interface SelectInputMultipleProps extends SelectInputProps {
	hasError?: boolean;
	optionPairs: SelectOptionPair[];
	selectedValues: any[];
}
