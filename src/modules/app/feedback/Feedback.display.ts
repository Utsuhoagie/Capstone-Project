import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
	DisplayModeMappers,
	FormattableFieldMappers,
	Formatters,
	Labellers,
	Mappers,
} from '../../../app/App.display';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

// dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

// NOTE: This changes together with Applicant
export const FEEDBACK_FIELDS: string[] = [
	'Title',
	'Description',
	'CreatedDate',
	'EmployeeFullName',
];

export const FEEDBACK_LABELLERS: Labellers = {
	Title: 'Tiêu đề',
	Description: 'Nội dung',
	CreatedDate: 'Ngày tạo',
	EmployeeFullName: 'Tên nhân viên',
};

export const FEEDBACK_DISPLAY_MODE_MAPPERS: DisplayModeMappers = {
	Title: 'normal',
	Description: 'normal',
	CreatedDate: 'formatted',
	EmployeeFullName: 'normal',
};

export const FEEDBACK_MAPPERS: Mappers = {};

export const FEEDBACK_FORMATTABLE_FIELD_MAPPERS: FormattableFieldMappers = {
	CreatedDate: 'Date',
};

export const FEEDBACK_FORMATTERS: Formatters = {
	Date: (value: Date | undefined) => {
		const timeInUTC = dayjs(value);
		const timeInLocal = timeInUTC.tz();

		return value ? timeInLocal.format('DD/MM/YYYY') : undefined;
	},
};
