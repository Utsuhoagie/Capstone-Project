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
import { DailyAttendanceList } from './daily-attendance-list/DailyAttendanceList';
import { AttendanceCalendar } from './attendance-calendar/AttendanceCalendar';

export const AttendanceModule = () => {
	return (
		<div className='max-h-screen'>
			{/* <EmployeeAttendanceList /> */}
			<AttendanceCalendar />
		</div>
	);
};
