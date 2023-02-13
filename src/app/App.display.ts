import dayjs from 'dayjs';

export type DisplayMode = 'mapped' | 'formatted' | 'normal';
export interface DisplayArgs {
	displayMode: DisplayMode;
	field: string;
	value: any;
}

export function getDisplayForFieldValue({
	displayMode,
	field,
	value,
}: DisplayArgs): string | number | undefined {
	switch (displayMode) {
		case 'mapped':
			return mapValueToDisplay({ field, value });
		case 'formatted':
			return formatFieldToDisplay({ field, value });
		case 'normal':
			return value;
	}
}

// ====== Mapped ======
interface MappableValue {
	value: any;
	display: string;
}

interface Mapper {
	[field: string]: MappableValue[];
}

/** NOTE: Mainly for Select/Radio fields */
const MAPPER: Mapper = {
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
	AppliedPosition: [
		{
			value: 'developer',
			display: 'Developer',
		},
		{
			value: 'marketing',
			display: 'Marketing',
		},
		{
			value: 'hr',
			display: 'Human Resources',
		},
	],
};

function mapValueToDisplay({
	field,
	value,
}: Omit<DisplayArgs, 'displayMode'>): string | undefined {
	const fieldValues = MAPPER[field];
	const mappableFieldValue = fieldValues.find(
		(fieldValue) => fieldValue.value === value
	);
	return mappableFieldValue?.display;
}

// ====== Formatted ======
type FormattableField = 'Date' | 'Money' | 'NationalId' | 'Phone';

interface FormattableFields {
	[field: string]: FormattableField;
}

const FORMATTABLE_FIELDS: FormattableFields = {
	NationalId: 'NationalId',
	Phone: 'Phone',
	BirthDate: 'Date',
	AppliedDate: 'Date',
	AskingSalary: 'Money',
};

interface Formatter {
	// NOTE: I wanna use [field: FormattableField] here but idk how
	[field: string]: (value: any) => string;
}

/** NOTE: Mainly for complex object or specific string fields like Date and NationalId */
const FORMATTER: Formatter = {
	Date: (value: Date) => dayjs(value).format('D-MM-YYYY'),
	Money: (value: number) => value.toLocaleString('vi-VN'),

	NationalId: (value: string) =>
		[
			value.slice(0, 3),
			value.slice(3, 6),
			value.slice(6, 9),
			value.length === 12 ? value.slice(9, 12) : undefined,
		].join(' '),
	Phone: (value: string) =>
		[value.slice(0, 4), value.slice(4, 7), value.slice(7)].join(' '),
};

function formatFieldToDisplay({
	field,
	value,
}: Omit<DisplayArgs, 'displayMode'>): string {
	const formattableField = FORMATTABLE_FIELDS[field];
	const formatter = FORMATTER[formattableField];
	return formatter(value);
}
