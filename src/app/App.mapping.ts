interface MappableValue {
	value: any;
	display: string;
}

interface Mapping {
	[module: string]: {
		[field: string]: MappableValue[];
	};
}

export const MAPPING: Mapping = {
	example: {
		fullName: [],
		age: [],
		position: [
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
		isCringe: [
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

	'applicant-tracking': {
		NationalId: [],
		FullName: [],
		Gender: [
			{
				value: 'male',
				display: 'Nam',
			},
			{
				value: 'female',
				display: 'Nữ',
			},
			{
				value: 'other',
				display: 'Khác',
			},
		],
		BirthDate: [],
		Phone: [],
		Email: [],
		AppliedPosition: [
			{
				value: 'developer',
				display: 'Developer',
			},
		],
		AppliedDate: [],
		AskingSalary: [],
	},
};

export function mapValueToDisplay({
	module,
	field,
	value,
}: {
	module: string;
	field: string;
	value: any;
}) {
	return MAPPING[module][field].find(
		(mappableValue) => mappableValue.value === value
	)?.display;
}
