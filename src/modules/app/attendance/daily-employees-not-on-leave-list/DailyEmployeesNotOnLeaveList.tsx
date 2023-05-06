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
import { DailyEmployeeNotOnLeave } from './DailyEmployeeNotOnLeave';
import { useSearchParams } from 'react-router-dom';
import {
	Employee_API_Response,
	mapToEmployee,
} from '../../employee/Employee.interface';

export const DailyEmployeesNotOnLeaveList = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const queryParams = QueryString.parse(searchParams.toString());
	const getEmployeesNotOnLeaveQuery = useQuery(
		['EmployeesNotOnLeave', { page: 1, pageSize: 30, date: queryParams.date }],
		async () => {
			const allQueryParams = QueryString.stringify({
				page: 1,
				pageSize: 30,
				date: queryParams.date,
			});
			const res = await API.get(
				`Attendances/EmployeesNotOnLeave?${allQueryParams}`
			);

			if (res.status >= 400) {
				window.alert(res.status);
				return;
			}

			const data: PagedResult<Employee_API_Response> = res.data;

			const employeesNotOnLeave = data.Items.map((Item) => mapToEmployee(Item));

			return employeesNotOnLeave;
		}
	);

	if (getEmployeesNotOnLeaveQuery.isLoading) {
		return <p>Loading...</p>;
	}

	if (getEmployeesNotOnLeaveQuery.error) {
		return <p>Error!</p>;
	}

	return (
		<div>
			Các nhân viên có lịch làm ngày{' '}
			{queryParams.date
				? dayjs(queryParams.date as string).format('DD/MM/YYYY')
				: ''}
			<div className='flex flex-col items-start justify-start gap-2'>
				{getEmployeesNotOnLeaveQuery.data?.map((employee) => {
					return (
						<DailyEmployeeNotOnLeave
							key={employee.NationalId}
							employee={employee}
						/>
					);
				})}
			</div>
		</div>
	);
};
