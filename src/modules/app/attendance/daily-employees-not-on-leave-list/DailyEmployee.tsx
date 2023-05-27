import { Disclosure } from '@headlessui/react';
import dayjs from 'dayjs';
import React, { useState } from 'react';
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
import { EyeIcon } from '../../../../assets/icons/EyeIcon';
import { DailyEmployeePopup } from './DailyEmployeePopup';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';

interface DailyAttendanceProps {
	// attendance: Attendance;
	employee: Employee;
	isOpen?: boolean;
}

export const DailyEmployee = ({ employee, isOpen }: DailyAttendanceProps) => {
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();

	const queryClient = useQueryClient();

	const [searchParams, setSearchParams] = useSearchParams();
	const queryParams = QueryString.parse(searchParams.toString());

	const [isHover, setIsHover] = useState<boolean>(false);

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

	const canStatusAccept =
		AttendanceStatus === AttendanceStatusEnum.Pending && Boolean(EndTimestamp);

	const canStatusReject =
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
					' flex w-w-attendance-item flex-row items-center justify-between rounded-sm border border-primary-dark-2 px-2 py-1 ' +
					(AttendanceStatus === undefined
						? ' cursor-not-allowed bg-neutral-white '
						: AttendanceStatus === AttendanceStatusEnum.Pending
						? 'cursor-pointer bg-state-warning-bright-3 hover:bg-state-warning-bright-1 ui-open:bg-state-warning-bright-3 '
						: AttendanceStatus === AttendanceStatusEnum.Accepted
						? 'cursor-pointer bg-state-success-bright-1 hover:bg-state-success-normal ui-open:bg-state-success-bright-1 '
						: 'cursor-pointer bg-state-error-bright-1 hover:bg-state-error-normal ui-open:bg-state-error-bright-1 ')
				}
			>
				<span>{employee.FullName}</span>
				<span className='text-tag text-neutral-gray-7'>
					({attendanceStatusBracketLabel})
				</span>
			</Disclosure.Button>

			<Disclosure.Panel
				static={isOpen}
				className={
					' w-w-attendance-item rounded-sm border border-primary-dark-2 px-2 py-2 ' +
					(getAttendanceOfEmployeeQuery.data ? '' : ' hidden ') +
					(AttendanceStatus === undefined
						? ' bg-neutral-white '
						: AttendanceStatus === AttendanceStatusEnum.Pending
						? ' bg-state-warning-bright-3 '
						: AttendanceStatus === AttendanceStatusEnum.Accepted
						? ' bg-state-success-bright-1 '
						: ' bg-state-error-bright-1 ')
				}
			>
				{
					getAttendanceOfEmployeeQuery.data ? (
						<>
							<div className='flex flex-row justify-between'>
								<div>
									{/* <p>CMND: {employee.NationalId}</p> */}
									<div
										className={
											'relative flex w-fit flex-row items-center gap-1 p-1 ' +
											(employee.ImageFileName
												? ' cursor-default '
												: ' cursor-not-allowed ')
										}
										onMouseEnter={() => setIsHover(true)}
										onMouseLeave={() => setIsHover(false)}
									>
										{employee.ImageFileName && (
											<EyeIcon size={16} className='fill-primary-normal' />
										)}
										<p className='text-tag'>
											{employee.ImageFileName ? 'Xem ảnh' : 'Không có ảnh'}
										</p>
										{employee.ImageFileName && isHover && (
											<DailyEmployeePopup employee={employee} />
										)}
									</div>

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
											canStatusAccept
												? 'cursor-pointer fill-state-success-normal hover:bg-state-success-bright-1 hover:fill-state-success-dark'
												: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
										}`}
										size={32}
										onClick={() =>
											canStatusAccept &&
											updateStatusMutation.mutate(AttendanceStatusEnum.Accepted)
										}
									/>
									<CloseIcon
										className={`rounded ${
											canStatusReject
												? 'cursor-pointer fill-state-error-normal hover:bg-state-error-bright-1 hover:fill-state-error-dark'
												: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
										}`}
										size={32}
										onClick={() =>
											canStatusReject &&
											updateStatusMutation.mutate(AttendanceStatusEnum.Rejected)
										}
									/>
								</div>
							</div>

							<div className='mt-4 mb-2 flex flex-row justify-between'>
								<img
									className='w-w-attendance-image'
									src={startImageQuery.data}
								/>
								<img
									className='w-w-attendance-image'
									src={endImageQuery.data}
								/>
							</div>
						</>
					) : undefined
					// <EmptyText />
				}
			</Disclosure.Panel>
		</Disclosure>
	);
};
