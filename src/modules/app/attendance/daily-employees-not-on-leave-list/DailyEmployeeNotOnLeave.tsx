import { Disclosure } from '@headlessui/react';
import dayjs from 'dayjs';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { CheckIcon } from '../../../../assets/icons/CheckIcon';
import { CloseIcon } from '../../../../assets/icons/CloseIcon';
import { EmptyText } from '../../../../components/atoms/EmptyText/EmptyText';
import { API } from '../../../../config/axios/axios.config';
import { Employee } from '../../employee/Employee.interface';
import { createImageUrl } from '../../file/File.utils';
import {
	Attendance,
	Attendance_API_Response,
	getStatusLabel,
	mapToAttendance,
	AttendanceStatusEnum,
} from '../Attendance.interface';
import QueryString from 'query-string';

interface DailyAttendanceProps {
	// attendance: Attendance;
	employee: Employee;
}

export const DailyEmployeeNotOnLeave = ({ employee }: DailyAttendanceProps) => {
	const queryClient = useQueryClient();

	const [searchParams, setSearchParams] = useSearchParams();
	const queryParams = QueryString.parse(searchParams.toString());

	const getAttendanceOfEmployeeQuery = useQuery(
		[
			'AttendanceOfEmployee',
			{ NationalId: employee.NationalId, date: queryParams.date },
		],
		async () => {
			const allQueryParams = QueryString.stringify({
				NationalId: employee.NationalId,
				date: queryParams.date,
			});

			const res = await API.get(
				`Attendances/AttendanceOfEmployee?${allQueryParams}`
			);

			if (res.status >= 400) {
				window.alert(res.status);
				return;
			}

			const data: Attendance_API_Response | null = res.data;
			const attendance = data ? mapToAttendance(data) : undefined;
			return attendance;
		}
	);
	const {
		EmployeeNationalId,
		EmployeeFullName,
		AttendanceStatus,
		StartTimestamp,
		StartImageFileName,
		EndTimestamp,
		EndImageFileName,
	} = getAttendanceOfEmployeeQuery.data ?? {};

	console.log(
		`for employee ${employee.NationalId}-${employee.FullName}: `,
		getAttendanceOfEmployeeQuery.data
	);

	const canStatusUpdate =
		AttendanceStatus === AttendanceStatusEnum.Pending &&
		(Boolean(EndTimestamp) || dayjs(StartTimestamp).isBefore(dayjs(), 'day'));

	let attendanceStatusBracketLabel: string;
	switch (AttendanceStatus) {
		case AttendanceStatusEnum.Accepted:
			attendanceStatusBracketLabel = 'Đã duyệt';
			break;
		case AttendanceStatusEnum.Pending:
			attendanceStatusBracketLabel = 'Chưa duyệt';
			break;
		case AttendanceStatusEnum.Rejected:
			attendanceStatusBracketLabel = 'Đã từ chối';
			break;
		case undefined:
			attendanceStatusBracketLabel = 'Chưa có';
			break;
	}

	const startImageQuery = useQuery(
		['files', { StartImageFileName: StartImageFileName }],
		async () => {
			const res = await API.get(
				`Files/Image/Attendances/${StartImageFileName}`,
				{
					responseType: 'blob',
				}
			);

			if (res.status >= 400) {
				window.alert(res.status);
				return;
			}

			// const b64 = Buffer.from(res.data, 'binary').toString('base64');

			// console.log({ imageResData: res.data, headers: res.headers });
			return createImageUrl(res.data);
		},
		{
			enabled: Boolean(StartImageFileName),
		}
	);

	const endImageQuery = useQuery(
		['files', { EndImageFileName: EndImageFileName }],
		async () => {
			const res = await API.get(`Files/Image/Attendances/${EndImageFileName}`, {
				responseType: 'blob',
			});

			if (res.status >= 400) {
				window.alert(res.status);
				return;
			}

			// const b64 = Buffer.from(res.data, 'binary').toString('base64');

			// console.log({ imageResData: res.data, headers: res.headers });
			return createImageUrl(res.data);
		},
		{
			enabled: Boolean(EndImageFileName),
		}
	);

	const updateStatusMutation = useMutation(
		'UpdateStatus',
		async (status: AttendanceStatusEnum) => {
			const res = await API.put('Attendances/UpdateStatus', {
				EmployeeNationalId: EmployeeNationalId,
				StartTimestamp: dayjs(StartTimestamp).toDate(),
				Status: status,
			});

			if (res.status >= 400) {
				window.alert(res.status);
				return;
			}

			return;
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	// Render
	if (
		getAttendanceOfEmployeeQuery.isLoading ||
		getAttendanceOfEmployeeQuery.isError
	) {
		return <p>...</p>;
	}

	return (
		<Disclosure as='div'>
			<Disclosure.Button
				className={
					' flex w-w-attendance-item cursor-pointer flex-row items-center justify-between rounded-sm border border-primary-dark-2 px-2 py-1 ' +
					(AttendanceStatus === undefined
						? ' bg-neutral-white hover:bg-primary-bright-4 ui-open:bg-primary-bright-4 '
						: AttendanceStatus === AttendanceStatusEnum.Pending
						? ' bg-state-warning-bright-3 hover:bg-state-warning-bright-1 ui-open:bg-state-warning-bright-3 '
						: AttendanceStatus === AttendanceStatusEnum.Accepted
						? ' bg-state-success-bright-1 hover:bg-state-success-normal ui-open:bg-state-success-bright-1 '
						: ' bg-state-error-bright-1 hover:bg-state-error-normal ui-open:bg-state-error-bright-1 ')
				}
			>
				<span>{employee.FullName}</span>
				<span className='text-tag text-neutral-gray-7'>
					({attendanceStatusBracketLabel})
				</span>
			</Disclosure.Button>

			<Disclosure.Panel
				className={
					' w-w-attendance-item rounded-sm border border-primary-dark-2 px-4 py-2 ' +
					(AttendanceStatus === undefined
						? ' bg-neutral-white '
						: AttendanceStatus === AttendanceStatusEnum.Pending
						? ' bg-state-warning-bright-3 '
						: AttendanceStatus === AttendanceStatusEnum.Accepted
						? ' bg-state-success-bright-1 '
						: ' bg-state-error-bright-1 ')
				}
			>
				{getAttendanceOfEmployeeQuery.data ? (
					<>
						<div className='flex flex-row justify-between'>
							<div>
								<p>CMND: {employee.NationalId}</p>
								<p>
									Bắt đầu:{' '}
									{StartTimestamp ? (
										dayjs(StartTimestamp).format('H:mm DD/MM/YYYY')
									) : (
										<EmptyText />
									)}
								</p>
								<p>
									Kết thúc:{' '}
									{EndTimestamp ? (
										dayjs(EndTimestamp).format('H:mm DD/MM/YYYY')
									) : (
										<EmptyText />
									)}
								</p>
								<p>
									Trạng thái:{' '}
									{AttendanceStatus !== undefined ? (
										getStatusLabel(AttendanceStatus)
									) : (
										<EmptyText />
									)}
								</p>
							</div>
							<div className='flex flex-col gap-2'>
								<CheckIcon
									className={`rounded ${
										canStatusUpdate
											? 'cursor-pointer fill-state-success-normal hover:bg-state-success-bright-1 hover:fill-state-success-dark'
											: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
									}`}
									size={32}
									onClick={() =>
										canStatusUpdate &&
										updateStatusMutation.mutate(AttendanceStatusEnum.Accepted)
									}
								/>
								<CloseIcon
									className={`rounded ${
										canStatusUpdate
											? 'cursor-pointer fill-state-error-normal hover:bg-state-error-bright-1 hover:fill-state-error-dark'
											: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
									}`}
									size={32}
									onClick={() =>
										canStatusUpdate &&
										updateStatusMutation.mutate(AttendanceStatusEnum.Rejected)
									}
								/>
							</div>
						</div>

						<div className='mt-4 mb-2 flex flex-row justify-between'>
							<img className='w-36' src={startImageQuery.data} />
							<img className='w-36' src={endImageQuery.data} />
						</div>
					</>
				) : (
					<EmptyText />
				)}
			</Disclosure.Panel>
		</Disclosure>
	);
};
