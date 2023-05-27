import dayjs, { Dayjs } from 'dayjs';
import QueryString from 'query-string';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { API } from '../../../../config/axios/axios.config';

interface BatchUpdateMonthSectionProps {
	days: number;
}

export const BatchUpdateMonthSection = ({
	days,
}: BatchUpdateMonthSectionProps) => {
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const queryClient = useQueryClient();
	const batchUpdateMutation = useMutation(
		['BatchUpdate', { date: dayjs().toISOString() }],
		async (type: 'Accept' | 'Reject') => {
			const queryParams = QueryString.stringify({
				type,
				dayOrMonth: 'month',
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

	const hasDays = days > 0;

	function handleBatchUpdate(type: 'Accept' | 'Reject') {
		openConfirmDialog({
			isClosable: true,
			message: `Bạn có chắc muốn ${
				type === 'Accept' ? 'duyệt' : 'từ chối'
			} tất cả các buổi chấm công trong tháng? Việc này sẽ đồng thời từ chối các buổi chấm công không hợp lệ.`,
			onConfirm: () => batchUpdateMutation.mutate(type),
			onSuccess: () => {},
		});
	}

	return (
		<div
			className={`flex w-fit flex-col gap-2 rounded border p-2 text-h4 ${
				hasDays
					? 'border-state-error-normal bg-state-error-bright-2'
					: 'border-state-success-normal bg-state-success-bright-2'
			}`}
		>
			<p>Còn {days} ngày cần duyệt/từ chối trong tháng này.</p>

			<Button
				disabled={!hasDays}
				variant='success'
				width='big'
				onClick={hasDays ? () => handleBatchUpdate('Accept') : undefined}
			>
				Duyệt tất cả
			</Button>

			<Button
				disabled={!hasDays}
				variant='error'
				width='big'
				onClick={hasDays ? () => handleBatchUpdate('Reject') : undefined}
			>
				Từ chối tất cả
			</Button>
		</div>
	);
};
