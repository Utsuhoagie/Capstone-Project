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
export const POSITION_FIELDS: string[] = [
	'Name',
	'ApplicantCount',
	'EmployeeCount',
];

export const POSITION_LABELLERS: Labellers = {
	Name: 'Vị trí',
	ApplicantCount: 'Số ứng viên',
	EmployeeCount: 'Số nhân viên',
};

export const POSITION_DISPLAY_MODE_MAPPERS: DisplayModeMappers = {
	Name: 'normal',
	ApplicantCount: 'normal',
	EmployeeCount: 'normal',
};

export const POSITION_MAPPERS: Mappers = {};

export const POSITION_FORMATTABLE_FIELD_MAPPERS: FormattableFieldMappers = {};

export const POSITION_FORMATTERS: Formatters = {};
