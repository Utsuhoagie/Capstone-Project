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

// NOTE: This changes together with Employee
export const EMPLOYEE_FIELDS: string[] = [
	'NationalId',
	'FullName',
	'Gender',
	'BirthDate',
	'Address',
	'Phone',
	'Email',
	'ExperienceYears',
	'PositionName',
	'Salary',
	'EmployedDate',
	'HasUser',
	'ResumeFileName',
];

export const EMPLOYEE_LABELLERS: Labellers = {
	NationalId: 'CMND / CCCD',
	FullName: 'Họ tên',
	Gender: 'Giới tính',
	BirthDate: 'Ngày sinh',
	Address: 'Địa chỉ',
	Phone: 'Số điện thoại',
	Email: 'Email',
	ExperienceYears: 'Năm kinh nghiệm',
	PositionName: 'Vị trí',
	Salary: 'Mức lương',
	EmployedDate: 'Ngày được tuyển',
	HasUser: 'Có tài khoản?',
	ResumeFileName: 'CV',
};

export const EMPLOYEE_DISPLAY_MODE_MAPPERS: DisplayModeMappers = {
	NationalId: 'formatted',
	FullName: 'normal',
	Gender: 'mapped',
	BirthDate: 'formatted',
	Address: 'normal',
	Phone: 'formatted',
	Email: 'normal',
	ExperienceYears: 'formatted',
	PositionName: 'normal',
	Salary: 'formatted',
	EmployedDate: 'formatted',
	HasUser: 'normal',
	ResumeFileName: 'normal',
};

export const EMPLOYEE_MAPPERS: Mappers = {
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
};

export const EMPLOYEE_FORMATTABLE_FIELD_MAPPERS: FormattableFieldMappers = {
	NationalId: 'NationalId',
	Phone: 'Phone',
	BirthDate: 'Date',
	ExperienceYears: 'ExperienceYears',
	Salary: 'Money',
	EmployedDate: 'Date',
};

export const EMPLOYEE_FORMATTERS: Formatters = {
	Date: (value: Date | undefined) => {
		const timeInUTC = dayjs(value);
		const timeInLocal = timeInUTC.tz();

		return value ? timeInLocal.format('DD/MM/YYYY') : undefined;
	},
	Time: (value: number) => `${value}:00`,
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
	ExperienceYears: (value: number) => `${value} năm`,
};
