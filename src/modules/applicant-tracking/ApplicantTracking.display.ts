import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
	DisplayModeMappers,
	FormattableFieldMappers,
	Formatters,
	Labellers,
	Mappers,
} from '../../app/App.display';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

// dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

// NOTE: This changes together with Applicant
export const APPLICANT_TRACKING_FIELDS: string[] = [
	'NationalId',
	'FullName',
	'Gender',
	'BirthDate',
	'Address',
	'Phone',
	'Email',
	'ExperienceYears',
	'AppliedPosition',
	'AppliedDate',
	'AskingSalary',
];

export const APPLICANT_TRACKING_LABELLERS: Labellers = {
	NationalId: 'CMND / CCCD',
	FullName: 'Họ tên',
	Gender: 'Giới tính',
	BirthDate: 'Ngày sinh',
	Address: 'Địa chỉ',
	Phone: 'Số điện thoại',
	Email: 'Email',
	ExperienceYears: 'Năm kinh nghiệm',
	AppliedPosition: 'Vị trí ứng tuyển',
	AppliedDate: 'Ngày ứng tuyển',
	AskingSalary: 'Mức lương đề nghị',
};

export const APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS: DisplayModeMappers = {
	NationalId: 'formatted',
	FullName: 'normal',
	Gender: 'mapped',
	BirthDate: 'formatted',
	Address: 'normal',
	Phone: 'formatted',
	Email: 'normal',
	ExperienceYears: 'formatted',
	AppliedPosition: 'normal',
	AppliedDate: 'formatted',
	AskingSalary: 'formatted',
};

export const APPLICANT_TRACKING_MAPPERS: Mappers = {
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
	// AppliedPosition: [
	// 	{
	// 		value: 'developer',
	// 		display: 'Developer',
	// 	},
	// 	{
	// 		value: 'marketing',
	// 		display: 'Marketing',
	// 	},
	// 	{
	// 		value: 'hr',
	// 		display: 'Human Resources',
	// 	},
	// ],
};

export const APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS: FormattableFieldMappers =
	{
		NationalId: 'NationalId',
		Phone: 'Phone',
		BirthDate: 'Date',
		ExperienceYears: 'ExperienceYears',
		AppliedDate: 'Date',
		AskingSalary: 'Money',
	};

export const APPLICANT_TRACKING_FORMATTERS: Formatters = {
	Date: (value: Date | undefined) => {
		// const timezoneParse = 'Europe/London'; // +00:00
		// const timezone = 'Asia/Dubai'; // +04:00
		// const timezoneConvert = 'Asia/Ho_Chi_Minh'; // +07:00
		// const timezone = 'Asia/Tokyo'; // +09:00
		// const timezone = 'Australia/Sydney'; // +10:00

		const timeInUTC = dayjs(value);
		const timeInLocal = timeInUTC.tz();

		return value ? timeInLocal.format('DD/MM/YYYY') : undefined;
	},
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
