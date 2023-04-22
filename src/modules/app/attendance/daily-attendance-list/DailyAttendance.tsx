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
	StatusEnum,
} from '../Attendance.interface';
import QueryString from 'query-string';

interface DailyAttendanceProps {
	// attendance: Attendance;
	employee: Employee;
}

export const DailyAttendance = ({ employee }: DailyAttendanceProps) => {
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

			if (res.status > 299) {
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
		Status,
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
		Status === StatusEnum.Pending && Boolean(EndTimestamp);

	const queryClient = useQueryClient();
	const startImageQuery = useQuery(
		['files', { StartImageFileName: StartImageFileName }],
		async () => {
			const res = await API.get(
				`Files/Image/Attendances/${StartImageFileName}`,
				{
					responseType: 'blob',
				}
			);

			if (res.status > 299) {
				window.alert(res.status);
				return;
			}

			// const b64 = Buffer.from(res.data, 'binary').toString('base64');

			// console.log({ imageResData: res.data, headers: res.headers });
			return createImageUrl(res.data);
		}
	);

	const endImageQuery = useQuery(
		['files', { EndImageFileName: EndImageFileName }],
		async () => {
			const res = await API.get(`Files/Image/Attendances/${EndImageFileName}`, {
				responseType: 'blob',
			});

			if (res.status > 299) {
				window.alert(res.status);
				return;
			}

			// const b64 = Buffer.from(res.data, 'binary').toString('base64');

			// console.log({ imageResData: res.data, headers: res.headers });
			return createImageUrl(res.data);
		}
	);

	const updateStatusMutation = useMutation(
		'UpdateStatus',
		async (status: StatusEnum) => {
			const res = await API.put('Attendances/UpdateStatus', {
				EmployeeNationalId: EmployeeNationalId,
				StartTimestamp: dayjs(StartTimestamp).toDate(),
				Status: status,
			});

			if (res.status > 299) {
				window.alert(res.status);
				return;
			}

			return;
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	function handleStatus(status: StatusEnum) {
		updateStatusMutation.mutate(status);
	}

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
					' w-w-attendance-item cursor-pointer rounded-sm border border-primary-dark-2 px-2 py-1 text-left ' +
					(Status === StatusEnum.Pending || Status === undefined
						? ' bg-neutral-white hover:bg-primary-bright-4 ui-open:bg-primary-bright-4 '
						: Status === StatusEnum.Accepted
						? ' bg-state-success-bright hover:bg-state-success-normal ui-open:bg-state-success-bright '
						: ' bg-state-error-bright hover:bg-state-error-normal ui-open:bg-state-error-bright ')
				}
			>
				{employee.FullName}
			</Disclosure.Button>

			<Disclosure.Panel
				className={
					' w-w-attendance-item rounded-sm border border-primary-dark-2 px-4 py-2 ' +
					(Status === StatusEnum.Pending || Status === undefined
						? ' bg-neutral-white '
						: Status === StatusEnum.Accepted
						? ' bg-state-success-bright '
						: ' bg-state-error-bright ')
				}
			>
				<div className='flex flex-row justify-between'>
					<div>
						<p>CMND: {employee.NationalId}</p>
						<p>
							Bắt đầu:{' '}
							{StartTimestamp ? (
								dayjs(StartTimestamp).format('H:mm D/MM/YYYY')
							) : (
								<EmptyText />
							)}
						</p>
						<p>
							Kết thúc:{' '}
							{EndTimestamp ? (
								dayjs(EndTimestamp).format('H:mm D/MM/YYYY')
							) : (
								<EmptyText />
							)}
						</p>
						<p>Trạng thái: {Status ? getStatusLabel(Status) : <EmptyText />}</p>
					</div>
					<div className='flex flex-col gap-2'>
						<CheckIcon
							className={`rounded ${
								canStatusUpdate
									? 'cursor-pointer fill-state-success-normal hover:bg-state-success-bright hover:fill-state-success-dark'
									: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
							}`}
							size={32}
							onClick={() =>
								canStatusUpdate && handleStatus(StatusEnum.Accepted)
							}
						/>
						<CloseIcon
							className={`rounded ${
								canStatusUpdate
									? 'cursor-pointer fill-state-error-normal hover:bg-state-error-bright hover:fill-state-error-dark'
									: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
							}`}
							size={32}
							onClick={() =>
								canStatusUpdate && handleStatus(StatusEnum.Rejected)
							}
						/>
					</div>
				</div>

				<div className='mt-4 mb-2 flex flex-row justify-between'>
					<img className='w-36' src={startImageQuery.data} />
					<img className='w-36' src={endImageQuery.data} />
				</div>
			</Disclosure.Panel>
		</Disclosure>
	);
};
