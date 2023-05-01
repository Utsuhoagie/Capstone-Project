import dayjs from 'dayjs';

export type AttendanceType = 'Start' | 'End';

export interface Attendance {
	EmployeeNationalId: string;
	EmployeeFullName: string;
	AttendanceStatus: AttendanceStatusEnum;
	StartTimestamp: Date;
	StartImageFileName: string;
	EndTimestamp?: Date;
	EndImageFileName?: string;
}

export interface Attendance_API_Response {
	EmployeeNationalId: string;
	EmployeeFullName: string;
	AttendanceStatus: AttendanceStatusEnum;
	StartTimestamp: string;
	StartImageFileName: string;
	EndTimestamp: string | null;
	EndImageFileName: string | null;
}

export function mapToAttendance(res: Attendance_API_Response): Attendance {
	return {
		...res,
		StartTimestamp: dayjs(res.StartTimestamp).toDate(),
		EndTimestamp: res.EndTimestamp
			? dayjs(res.EndTimestamp).toDate()
			: undefined,
		EndImageFileName: res.EndImageFileName ? res.EndImageFileName : undefined,
	};
}

export enum AttendanceStatusEnum {
	Pending = 0,
	Accepted = 1,
	Rejected = -1,
}

export enum DailyStatus {
	Pending = 0,
	Finished = 1,
	Empty = -1,
}

export type DailyStatus_API_Response = DailyStatus[];

export function getStatusLabel(attendanceStatus: AttendanceStatusEnum): string {
	if (attendanceStatus === AttendanceStatusEnum.Pending) {
		return 'Chưa xác nhận';
	} else if (attendanceStatus === AttendanceStatusEnum.Accepted) {
		return 'Đã xác nhận';
	} else if (attendanceStatus === AttendanceStatusEnum.Rejected) {
		return 'Đã từ chối';
	}

	return '';
}
