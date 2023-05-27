import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDialogStore, useToastStore } from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { EmptyText } from '../../../../components/atoms/EmptyText/EmptyText';
import { API } from '../../../../config/axios/axios.config';
import { Leave_API_Response, mapToLeave } from '../../leaves/Leaves.interface';
import { useEmployeeStore } from '../Employee.store';

export const ViewLeavesButton = () => {
	const { selectedEmployee } = useEmployeeStore();
	const { openDialog } = useDialogStore();
	const { showToast } = useToastStore();

	const getLeavesOfEmployeeQuery = useQuery(
		['Leaves', { NationalId: selectedEmployee?.NationalId }],
		async () => {
			const res = await API.get(`Leaves/${selectedEmployee?.NationalId}`);

			if (res.status >= 400) {
				showToast({ state: 'error' });
				return;
			}

			const leaves: Leave_API_Response[] = res.data;

			return leaves.map((leave) => mapToLeave(leave));
		}
	);

	return (
		<Button
			variant='secondary'
			width='big'
			onClick={() => {
				console.log(getLeavesOfEmployeeQuery);
				openDialog({
					isClosable: true,
					title: 'Các ngày nghỉ phép',
					content: (
						<div className='flex w-w-list-section flex-col gap-2 bg-primary-bright-7 p-4'>
							{getLeavesOfEmployeeQuery.isSuccess ? (
								getLeavesOfEmployeeQuery.data &&
								getLeavesOfEmployeeQuery.data.length > 0 ? (
									getLeavesOfEmployeeQuery.data.map((leave) => {
										const StartDate = dayjs(leave.StartDate).format(
											'DD/MM/YYYY'
										);
										const EndDate = dayjs(leave.EndDate).format('DD/MM/YYYY');
										const diff =
											dayjs(leave.EndDate).diff(dayjs(leave.StartDate), 'day') +
											1;
										return (
											<p className='rounded border border-primary-normal bg-neutral-white p-2 text-neutral-gray-9 shadow'>
												{StartDate} - {EndDate} ({diff} ngày)
											</p>
										);
									})
								) : (
									<EmptyText />
								)
							) : (
								'...' + getLeavesOfEmployeeQuery.error
							)}
						</div>
					),
				});
			}}
		>
			Xem ngày nghỉ phép
		</Button>
	);
};
