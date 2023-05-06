import dayjs from 'dayjs';
import QueryString from 'query-string';
import { useQuery } from 'react-query';
import { PagedResult } from '../../../components/organisms/Table/Pagination/Pagination.interface';
import { API } from '../../../config/axios/axios.config';
import {
	Attendance_API_Response,
	mapToAttendance,
} from './Attendance.interface';
import { Buffer } from 'buffer';
import { DailyEmployeesNotOnLeaveList } from './daily-employees-not-on-leave-list/DailyEmployeesNotOnLeaveList';
import { AttendanceCalendar } from './attendance-calendar/AttendanceCalendar';

export const AttendanceModule = () => {
	return (
		<div className='flex max-h-screen flex-row justify-start gap-8'>
			{/* <EmployeeAttendanceList /> */}
			<AttendanceCalendar />

			<div className='flex flex-col items-start gap-2 self-center'>
				<div className='flex flex-row items-center justify-start gap-2'>
					<div className='h-8 w-8 border border-neutral-black bg-primary-bright-4' />
					<p>Ngày đã hoàn tất kiểm tra chấm công</p>
				</div>
				<div className='flex flex-row items-center justify-start gap-2'>
					<div className='h-8 w-8 border border-neutral-black bg-state-warning-bright-3' />
					<p>Ngày cần kiểm tra chấm công</p>
				</div>
			</div>
		</div>
	);
};
