import dayjs from 'dayjs';

// ====== Table of contents ======
// 1. Labels (for getting the label or column header)
// 2. Display mode (for getting ...)

// ====== Display Configs ======

/** Used once per module */
export interface DisplayConfigs {
	labellers: Labellers;
	displayModeMappers: DisplayModeMappers;
	mappers: Mappers;
	formattableFieldMappers: FormattableFieldMappers;
	formatters: Formatters;
}

// ====== Labels ======

export interface Labellers {
	[field: string]: string;
}

// const LABELLER: Labeller = {
// 	NationalId: 'CMND / CCCD',
// 	FullName: 'Họ tên',
// 	Gender: 'Giới tính',
// 	BirthDate: 'Ngày sinh',
// 	Address: 'Địa chỉ',
// 	Phone: 'Số điện thoại',
// 	Email: 'Email',
// 	AppliedPosition: 'Vị trí ứng tuyển',
// 	AppliedDate: 'Ngày ứng tuyển',
// 	AskingSalary: 'Mức lương đề nghị',
// };

export function getLabelForField({
	labellers,
	field,
}: {
	labellers: Labellers;
	field: string;
}): string {
	return labellers[field];
}

// ====== Display Value (both mapped & formatted) ======

export type DisplayMode = 'mapped' | 'formatted' | 'normal';

export interface DisplayModeMappers {
	[field: string]: DisplayMode;
}

// const DISPLAY_MODE_MAPPER: DisplayModeMapper = {
// 	NationalId: 'formatted',
// 	FullName: 'normal',
// 	Gender: 'mapped',
// 	BirthDate: 'formatted',
// 	Address: 'normal',
// 	Phone: 'formatted',
// 	Email: 'normal',
// 	AppliedPosition: 'mapped',
// 	AppliedDate: 'formatted',
// 	AskingSalary: 'formatted',
// };

export interface DisplayArgs {
	displayConfigs: DisplayConfigs;
	field: string;
	value: any;
}

export function getDisplayForFieldValue({
	displayConfigs,
	field,
	value,
}: DisplayArgs): string | number {
	const displayMode = displayConfigs.displayModeMappers[field];

	switch (displayMode) {
		case 'mapped':
			return mapValueToDisplay({ displayConfigs, field, value });
		case 'formatted':
			return formatFieldToDisplay({ displayConfigs, field, value });
		case 'normal':
			return value;
	}
}

// ====== Mapped ======
// NOTE: Mainly for Select/Radio fields
interface MappableValue {
	value: any;
	display: string;
}

export interface Mappers {
	[field: string]: MappableValue[];
}

function mapValueToDisplay({
	displayConfigs: { mappers },
	field,
	value,
}: DisplayArgs): string {
	const fieldValues = mappers[field];
	const mappableFieldValue = fieldValues.find(
		(fieldValue) => fieldValue.value === value
	);
	return mappableFieldValue!.display;
}

// ====== Formatted ======
// NOTE: Mainly for complex object or specific string fields like Date and NationalId

// type FormattableField = 'Date' | 'Money' | 'NationalId' | 'Phone';

export interface FormattableFieldMappers {
	[field: string]: string;
}

export interface Formatters {
	// NOTE: I wanna use [field: FormattableField] here but idk how
	[formattableField: string]: (value: any) => string;
}

function formatFieldToDisplay({
	displayConfigs: { formattableFieldMappers, formatters },
	field,
	value,
}: DisplayArgs): string {
	const formattableField = formattableFieldMappers[field];
	const formatter = formatters[formattableField];
	return formatter(value);
}
