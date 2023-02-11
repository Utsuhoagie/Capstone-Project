interface MappableValue {
	value: any;
	display: string;
}

interface Mapping {
	[module: string]: {
		[field: string]: {
			header: string;
			values?: MappableValue[];
		};
	};
}

export const MAPPING: Mapping = {
	example: {
		fullName: {
			header: 'Full Name',
		},
		age: {
			header: 'Age',
		},
		position: {
			header: 'Position',
			values: [
				{
					value: 'dev',
					display: 'Developer',
				},
				{
					value: 'marketing',
					display: 'Marketing',
				},
				{
					value: 'finance',
					display: 'Financing',
				},
			],
		},
		isCringe: {
			header: 'Is Cringe',
			values: [
				{
					value: true,
					display: 'tru af',
				},
				{
					value: false,
					display: 'L lmao',
				},
			],
		},
	},
};

export function mapHeaderToDisplay({
	module,
	field,
}: {
	module: string;
	field: string;
}) {
	return MAPPING[module][field].header;
}

export function mapValueToDisplay({
	module,
	field,
	value,
}: {
	module: string;
	field: string;
	value: any;
}) {
	return MAPPING[module][field].values!.find(
		(mappableValue) => mappableValue.value === value
	)?.display;
}
