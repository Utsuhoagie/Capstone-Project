import { Dayjs } from 'dayjs';
import QueryString from 'query-string';
import React from 'react';
import { useMutation } from 'react-query';
import { useToastStore } from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { API } from '../../../../config/axios/axios.config';

interface BatchUpdatePreviousDaysOfMonthProps {
	currentDate: Dayjs;
	days: number;
}

export const BatchUpdatePreviousDaysOfMonth = ({
	currentDate,
	days,
}: BatchUpdatePreviousDaysOfMonthProps) => {
	const { showToast } = useToastStore();
	const hasDays = days > 0;

	const batchUpdatePreviousDaysOfMonthMutation = useMutation(
		['BatchUpdatePreviousDaysOfMonth', { date: currentDate.toISOString() }],
		async (type: 'Accept' | 'Reject') => {
			const queryParams = QueryString.stringify({
				type,
				date: currentDate.toISOString(),
			});
			const res = await API.put(
				`Attendances/BatchUpdatePreviousDaysOfMonth?${queryParams}`
			);

			if (res.status >= 400) {
				showToast({ state: 'error' });
			} else {
				showToast({ state: 'success' });
			}
		}
	);

	function handleBatchUpdatePreviousDaysOfMonth(type: 'Accept' | 'Reject') {
		batchUpdatePreviousDaysOfMonthMutation.mutate(type);
	}

	return (
		<div
			className={`flex w-fit flex-col gap-2 rounded border p-2 text-h4 ${
				hasDays
					? 'border-state-error-normal bg-state-error-bright-2'
					: 'border-state-success-normal bg-state-success-bright-2'
			}`}
		>
			<p>Còn {days} ngày cần từ chối.</p>

			<Button
				disabled={!hasDays}
				variant='success'
				width='big'
				onClick={
					hasDays
						? () => handleBatchUpdatePreviousDaysOfMonth('Accept')
						: undefined
				}
			>
				Duyệt tất cả
			</Button>

			<Button
				disabled={!hasDays}
				variant='error'
				width='big'
				onClick={
					hasDays
						? () => handleBatchUpdatePreviousDaysOfMonth('Reject')
						: undefined
				}
			>
				Từ chối tất cả
			</Button>
		</div>
	);
};
