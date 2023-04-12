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
import { EmployeeAttendanceList } from './employee-attendance-list/EmployeeAttendanceList';

export const AttendanceModule = () => {
	return (
		<div className='max-h-screen'>
			<EmployeeAttendanceList />
		</div>
	);
};
