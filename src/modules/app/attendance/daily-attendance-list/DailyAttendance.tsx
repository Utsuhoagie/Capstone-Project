import { Disclosure } from '@headlessui/react';
import dayjs from 'dayjs';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CheckIcon } from '../../../../assets/icons/CheckIcon';
import { CloseIcon } from '../../../../assets/icons/CloseIcon';
import { EmptyText } from '../../../../components/atoms/EmptyText/EmptyText';
import { API } from '../../../../config/axios/axios.config';
import { Attendance, getStatusLabel, Status } from '../Attendance.interface';

interface DailyAttendanceProps {
	attendance: Attendance;
}

export const DailyAttendance = ({ attendance }: DailyAttendanceProps) => {
	const {
		EmployeeNationalId,
		EmployeeFullName,
		StartTimestamp,
		StartImageFileName,
		EndTimestamp,
		EndImageFileName,
	} = attendance;

	const canStatusUpdate =
		attendance.Status === Status.Pending && Boolean(EndTimestamp);

	const queryClient = useQueryClient();
	const startImgQuery = useQuery(
		['files', { StartImageFileName: StartImageFileName }],
		async () => {
			const res = await API.get(`Files/Image/${StartImageFileName}`, {
				responseType: 'blob',
			});

			if (res.status >= 299) {
				window.alert(res.status);
				return;
			}

			// const b64 = Buffer.from(res.data, 'binary').toString('base64');

			console.log({ imgResData: res.data, headers: res.headers });
			const imgObjectURL = URL.createObjectURL(res.data);
			return imgObjectURL;
		}
	);

	const endImgQuery = useQuery(
		['files', { EndImageFileName: EndImageFileName }],
		async () => {
			const res = await API.get(`Files/Image/${EndImageFileName}`, {
				responseType: 'blob',
			});

			if (res.status >= 299) {
				window.alert(res.status);
				return;
			}

			// const b64 = Buffer.from(res.data, 'binary').toString('base64');

			console.log({ imgResData: res.data, headers: res.headers });
			const imgObjectURL = URL.createObjectURL(res.data);
			return imgObjectURL;
		}
	);

	const updateStatusMutation = useMutation(
		'UpdateStatus',
		async (status: Status) => {
			const res = await API.put('Attendances/UpdateStatus', {
				EmployeeNationalId: EmployeeNationalId,
				StartTimestamp: dayjs(StartTimestamp).toDate(),
				Status: status,
			});

			if (res.status <= 299) {
				window.alert(res.status);
				return;
			}

			return;
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	function handleStatus(status: Status) {
		updateStatusMutation.mutate(status);
	}

	return (
		<Disclosure as='div'>
			<Disclosure.Button
				className={
					' w-w-attendance-item cursor-pointer rounded-sm border border-primary-dark-2 px-2 py-1 text-left ' +
					(attendance.Status === Status.Pending
						? ' bg-neutral-white hover:bg-primary-bright-4 ui-open:bg-primary-bright-4 '
						: attendance.Status === Status.Accepted
						? ' bg-state-success-bright hover:bg-state-success-normal ui-open:bg-state-success-bright '
						: ' bg-state-error-bright hover:bg-state-error-normal ui-open:bg-state-error-bright ')
				}
			>
				{attendance.EmployeeFullName}
			</Disclosure.Button>

			<Disclosure.Panel
				className={
					' w-w-attendance-item rounded-sm border border-primary-dark-2 px-4 py-2 ' +
					(attendance.Status === Status.Pending
						? ' bg-neutral-white '
						: attendance.Status === Status.Accepted
						? ' bg-state-success-bright '
						: ' bg-state-error-bright ')
				}
			>
				<div className='flex flex-row justify-between'>
					<div>
						<p>Bắt đầu: {dayjs(StartTimestamp).format('H:mm D/MM/YYYY')}</p>
						<p>
							Kết thúc:{' '}
							{EndTimestamp ? (
								dayjs(EndTimestamp).format('H:mm D/MM/YYYY')
							) : (
								<EmptyText />
							)}
						</p>
						<p>Trạng thái: {getStatusLabel(attendance.Status)}</p>
					</div>
					<div className='flex flex-col gap-2'>
						<CheckIcon
							className={`rounded ${
								canStatusUpdate
									? 'cursor-pointer fill-state-success-normal hover:bg-state-success-bright hover:fill-state-success-dark'
									: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
							}`}
							size={32}
							onClick={() => canStatusUpdate && handleStatus(Status.Accepted)}
						/>
						<CloseIcon
							className={`rounded ${
								canStatusUpdate
									? 'cursor-pointer fill-state-error-normal hover:bg-state-error-bright hover:fill-state-error-dark'
									: 'cursor-not-allowed bg-neutral-gray-5 fill-neutral-gray-8 opacity-50'
							}`}
							size={32}
							onClick={() => canStatusUpdate && handleStatus(Status.Rejected)}
						/>
					</div>
				</div>

				<div className='mt-4 mb-2 flex flex-row justify-between'>
					<img className='w-36' src={startImgQuery.data} />
					<img className='w-36' src={endImgQuery.data} />
				</div>
			</Disclosure.Panel>
		</Disclosure>
	);
};
