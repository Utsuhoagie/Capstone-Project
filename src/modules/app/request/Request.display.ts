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
import { RequestStatus } from './Request.interface';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

// dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

// NOTE: This changes together with Applicant
export const REQUEST_FIELDS: string[] = [
	'EmployeeFullName',
	'Type',
	'Title',
	'Description',
	'CreatedDate',
	'RequestStatus',
	'NewSalary',
	'StartLeaveDate',
	'EndLeaveDate',
];

export const REQUEST_LABELLERS: Labellers = {
	Title: 'Tiêu đề',
	Description: 'Nội dung',
	CreatedDate: 'Ngày tạo',
	Type: 'Loại yêu cầu',
	RequestStatus: 'Trạng thái',
	NewSalary: 'Mức lương yêu cầu',
	StartLeaveDate: 'Ngày bắt đầu nghỉ phép',
	EndLeaveDate: 'Ngày kết thúc nghỉ phép',
	EmployeeFullName: 'Tên nhân viên',
};

export const REQUEST_DISPLAY_MODE_MAPPERS: DisplayModeMappers = {
	Title: 'normal',
	Description: 'normal',
	CreatedDate: 'formatted',
	Type: 'mapped',
	RequestStatus: 'mapped',
	NewSalary: 'formatted',
	StartLeaveDate: 'formatted',
	EndLeaveDate: 'formatted',
	EmployeeFullName: 'normal',
};

export const REQUEST_MAPPERS: Mappers = {
	Type: [
		{
			value: 'Raise',
			display: 'Tăng lương',
		},
		{
			value: 'Leave',
			display: 'Nghỉ phép',
		},
		{
			value: 'Other',
			display: 'Khác',
		},
	],
	RequestStatus: [
		{
			value: RequestStatus.Pending,
			display: 'Chờ xử lý',
		},
		{
			value: RequestStatus.Accepted,
			display: 'Chấp nhận',
		},
		{
			value: RequestStatus.Rejected,
			display: 'Từ chối',
		},
	],
};

export const REQUEST_FORMATTABLE_FIELD_MAPPERS: FormattableFieldMappers = {
	CreatedDate: 'Date',
	NewSalary: 'Money',
	StartLeaveDate: 'Date',
	EndLeaveDate: 'Date',
};

export const REQUEST_FORMATTERS: Formatters = {
	Date: (value: Date | undefined) => {
		const timeInUTC = dayjs(value);
		const timeInLocal = timeInUTC.tz();

		return value ? timeInLocal.format('DD/MM/YYYY') : undefined;
	},
	Money: (value?: number) => value?.toLocaleString('vi-VN'),
};
