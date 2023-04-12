import dayjs from 'dayjs';
import React from 'react';
import { useQuery } from 'react-query';
import QueryString from 'query-string';
import { API } from '../../../../config/axios/axios.config';
import { PagedResult } from '../../../../components/organisms/Table/Pagination/Pagination.interface';
import {
	Attendance_API_Response,
	mapToAttendance,
} from '../Attendance.interface';
import { EmployeeAttendance } from './EmployeeAttendance';

export const EmployeeAttendanceList = () => {
	const { isLoading, error, data } = useQuery(
		[
			'attendances',
			{ page: 1, pageSize: 30, date: dayjs().startOf('day').toISOString() },
		],
		async () => {
			const queryParams = QueryString.stringify({
				page: 1,
				pageSize: 30,
				date: dayjs().startOf('day').toISOString(),
			});
			const res = await API.get(`Attendances/Daily?${queryParams}`);

			if (res.status >= 299) {
				window.alert(res.status);
				return;
			}

			const data: PagedResult<Attendance_API_Response> = res.data;

			const attendances = data.Items.map((Item) => mapToAttendance(Item));

			return attendances;
		}
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error!</p>;
	}

	return (
		<div>
			Các nhân viên có lịch làm hôm nay
			<div className='flex flex-col items-start justify-start gap-2'>
				{data?.map((attendance) => {
					return (
						<EmployeeAttendance
							key={attendance.EmployeeFullName}
							attendance={attendance}
						/>
					);
				})}
			</div>
		</div>
	);
};
