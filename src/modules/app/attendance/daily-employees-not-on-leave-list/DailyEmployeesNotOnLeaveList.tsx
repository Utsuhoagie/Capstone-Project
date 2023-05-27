import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import QueryString from 'query-string';
import { API } from '../../../../config/axios/axios.config';
import { PagedResult } from '../../../../components/organisms/Table/Pagination/Pagination.interface';
import {
	Attendance_API_Response,
	mapToAttendance,
} from '../Attendance.interface';
import { DailyEmployee } from './DailyEmployee';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	Employee_API_Response,
	mapToEmployee,
} from '../../employee/Employee.interface';
import { ArrowSmallIcon } from '../../../../assets/icons/ArrowSmallIcon';
import { BackButton } from '../../../../components/molecules/BackButton/BackButton';
import { CheckboxIcon } from '../../../../assets/icons/CheckboxIcon';
import { Button } from '../../../../components/atoms/Button/Button';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';

export const DailyEmployeesNotOnLeaveList = () => {
	const navigate = useNavigate();
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();

	const queryClient = useQueryClient();

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

	const [isAllOpen, setIsAllOpen] = useState<boolean>(false);

	const batchUpdateMutation = useMutation(
		['BatchUpdate', { date: dayjs().toISOString() }],
		async (type: 'Accept' | 'Reject') => {
			const queryParams = QueryString.stringify({
				type,
				dayOrMonth: 'day',
				date: dayjs().toISOString(),
			});
			const res = await API.put(
				`Attendances/BatchUpdateStatuses?${queryParams}`
			);

			showToast({ state: 'success' });
		},
		{
			onSuccess: () => queryClient.invalidateQueries(),
		}
	);

	function handleBatchUpdate(type: 'Accept' | 'Reject') {
		openConfirmDialog({
			isClosable: true,
			message: `Bạn có chắc muốn ${
				type === 'Accept' ? 'duyệt' : 'từ chối'
			} tất cả các buổi chấm công trong ngày? Việc này sẽ đồng thời từ chối các buổi chấm công không hợp lệ.`,
			onConfirm: () => batchUpdateMutation.mutate(type),
			onSuccess: () => {},
		});
	}

	if (getEmployeesNotOnLeaveQuery.isLoading) {
		return <p>Loading...</p>;
	}

	if (getEmployeesNotOnLeaveQuery.error) {
		return <p>Error!</p>;
	}

	return (
		<div className='flex flex-col gap-2'>
			<BackButton to='/app/attendances' label='Trở lại' />

			<div className='flex flex-row justify-between'>
				<p className='mt-1 text-h3 font-semibold'>
					Các nhân viên có lịch làm ngày{' '}
					{queryParams.date
						? dayjs(queryParams.date as string).format('DD/MM/YYYY')
						: ''}
				</p>

				<div className='flex flex-row gap-2'>
					<Button
						variant='success'
						width='big'
						onClick={() => handleBatchUpdate('Accept')}
					>
						Duyệt tất cả
					</Button>
					<Button
						variant='error'
						width='big'
						onClick={() => handleBatchUpdate('Reject')}
					>
						Từ chối tất cả
					</Button>

					<div
						className='ml-2 flex w-fit cursor-pointer flex-row items-center gap-2 p-1 hover:bg-secondary-bright-3'
						onClick={() => setIsAllOpen((isAllOpen) => !isAllOpen)}
					>
						<CheckboxIcon size={32} checked={isAllOpen} />
						<p className='text-h4'>Hiện tất cả</p>
					</div>
				</div>
			</div>

			<div className='h-[650px] w-full overflow-auto rounded border border-primary-dark-1 bg-primary-bright-7 p-2 shadow'>
				<div className='flex flex-row flex-wrap items-start justify-start gap-2'>
					{getEmployeesNotOnLeaveQuery.data?.map((employee) => {
						return (
							<DailyEmployee
								key={employee.NationalId}
								employee={employee}
								isOpen={isAllOpen}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
