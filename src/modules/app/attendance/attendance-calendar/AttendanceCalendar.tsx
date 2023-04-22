import dayjs, { Dayjs } from 'dayjs';
import QueryString from 'query-string';
import { range } from 'ramda';
import { useEffect } from 'react';
import Calendar from 'react-calendar';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowSmallIcon } from '../../../../assets/icons/ArrowSmallIcon';
import { API } from '../../../../config/axios/axios.config';
import { DailyStatus, DailyStatus_API_Response } from '../Attendance.interface';
import './AttendanceCalendar.css';

const WEEKDAY_MAPPING = {
	0: 'CN',
	1: 'T2',
	2: 'T3',
	3: 'T4',
	4: 'T5',
	5: 'T6',
	6: 'T7',
};

export const AttendanceCalendar = () => {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();
	const dateQueryParam = searchParams.get('date');
	const currentDate = dateQueryParam
		? dayjs.unix(Number(dateQueryParam))
		: dayjs().startOf('month');
	const daysInMonth = currentDate.daysInMonth();

	let firstSundayForCalendar = currentDate.startOf('week');
	while (firstSundayForCalendar.month() === currentDate.month()) {
		firstSundayForCalendar = firstSundayForCalendar.subtract(1, 'week');
	}
	const firstSundayOffset = Math.abs(
		firstSundayForCalendar.diff(currentDate.startOf('month'), 'day')
	);

	let lastSaturdayForCalendar = currentDate.endOf('week');
	while (lastSaturdayForCalendar.month() === currentDate.month()) {
		lastSaturdayForCalendar = lastSaturdayForCalendar.add(1, 'week');
	}
	const lastSaturdayOffset = lastSaturdayForCalendar.diff(
		currentDate.endOf('month'),
		'day'
	);

	const attendanceDailyStatusesOfMonthQuery = useQuery(
		['DailyAttendanceStatusesOfMonth', { date: currentDate }],
		async () => {
			const res = await API.get(
				`Attendances/DailyAttendanceStatusesOfMonth?date=${currentDate.toISOString()}`
			);

			const data: DailyStatus_API_Response = res.data;

			return data;
		}
	);

	// console.table({
	// 	firstSundayForCalendar: firstSundayForCalendar.toDate(),
	// 	firstSundayOffset,
	// 	lastSaturdayForCalendar: lastSaturdayForCalendar.toDate(),
	// 	lastSaturdayOffset,
	// });

	function handleChangeMonth(direction: 'prev' | 'next') {
		const currentDate = searchParams.get('date')
			? dayjs.unix(Number(searchParams.get('date')))
			: dayjs();
		const newDate =
			direction === 'next'
				? currentDate.add(1, 'month')
				: currentDate.subtract(1, 'month');
		const newQueryParams = QueryString.stringify({ date: newDate.unix() });

		console.log({ currentDate, newDate, newQueryParams });
		setSearchParams(newQueryParams);
	}

	function handleChooseDay(day: Dayjs) {
		// window.alert(day.toDate());
		navigate(`daily?date=${day.toISOString()}`);
	}

	if (!attendanceDailyStatusesOfMonthQuery.data) {
		return <p>...</p>;
	}

	return (
		<div>
			<div className='mb-4 flex w-full flex-row items-center justify-start gap-4'>
				<ArrowSmallIcon
					className='cursor-pointer rounded border border-black bg-neutral-white fill-neutral-black'
					direction='left'
					size={32}
					onClick={() => handleChangeMonth('prev')}
				/>
				<p className='text-h2 font-bold'>
					Tháng {currentDate.format('M/YYYY')}
				</p>
				<ArrowSmallIcon
					className='cursor-pointer rounded border border-black bg-neutral-white fill-neutral-black'
					direction='right'
					size={32}
					onClick={() => handleChangeMonth('next')}
				/>
			</div>

			<div className='flex h-full w-72 flex-row flex-wrap content-start items-start'>
				{/* CN - T7 headers */}
				{range(0, 7).map((weekday) => {
					return (
						<p
							className={
								' h-10 w-10 border-t border-l border-black bg-secondary-normal text-center last:border-r ' +
								(weekday === 6 ? ' border-r ' : '')
							}
						>
							{WEEKDAY_MAPPING[weekday]}
						</p>
					);
				})}
				{/* Last month's days */}
				{range(0, firstSundayOffset).map((_, index) => {
					const day = firstSundayForCalendar.date() + index;
					return (
						<div
							className={` h-10 w-10 border-t border-l border-black bg-neutral-gray-5 text-center`}
						>
							{day}
						</div>
					);
				})}
				{/* This month's days */}
				{range(0, daysInMonth).map((_, index) => {
					const dailyStatus = attendanceDailyStatusesOfMonthQuery.data[index];
					const day = currentDate.startOf('month').add(index, 'day');

					// NOTE: fix weekends here
					// const isWeekend = day.day() === 0 || day.day() === 6;
					const isWeekend = false;

					const hasRightBorder = day.day() === 6;
					const hasBottomBorder = day.isAfter(
						currentDate.endOf('month').subtract(7 - lastSaturdayOffset, 'day'),
						'day'
					);
					// console.log({ day: day.toDate(), dailyStatus });
					return (
						<div
							className={` h-10 w-10 border-t border-l border-black text-center ${
								isWeekend
									? ' bg-neutral-gray-4 '
									: ` cursor-pointer ${
											dailyStatus === DailyStatus.Finished
												? ' bg-state-success-bright hover:bg-state-success-normal '
												: dailyStatus === DailyStatus.Pending
												? ' bg-state-error-bright hover:bg-state-error-normal '
												: ' hover:bg-neutral-gray-4 '
									  }`
							} ${hasRightBorder && 'border-r'} ${
								hasBottomBorder && 'border-b'
							}`}
							onClick={isWeekend ? undefined : () => handleChooseDay(day)}
						>
							{day.date()}
						</div>
					);
				})}
				{/* Next month's days */}
				{range(0, lastSaturdayOffset).map((_, index) => {
					const day = index + 1;
					return (
						<div className='h-10 w-10 border-t border-l border-b border-black bg-neutral-gray-5 text-center last-of-type:border-r'>
							{day}
						</div>
					);
				})}
			</div>
		</div>
	);
};
