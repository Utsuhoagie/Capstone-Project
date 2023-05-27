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
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BatchUpdateMonthSection } from './BatchUpdateMonthSection';

const WEEKDAY_MAPPING = {
	0: 'CN',
	1: 'T2',
	2: 'T3',
	3: 'T4',
	4: 'T5',
	5: 'T6',
	6: 'T7',
};

dayjs.extend(customParseFormat);

export const AttendanceCalendar = () => {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();
	const dateQueryParam = searchParams.get('date');
	const currentStartOfMonth = dateQueryParam
		? dayjs(dateQueryParam, 'DD-MM-YYYY').startOf('month')
		: dayjs().startOf('month');
	const daysInMonth = currentStartOfMonth.daysInMonth();

	// Construct calendar tiles
	let firstSundayForCalendar = currentStartOfMonth.startOf('week');
	while (
		firstSundayForCalendar.month() === currentStartOfMonth.month() &&
		firstSundayForCalendar.date() !== 1
	) {
		firstSundayForCalendar = firstSundayForCalendar.subtract(1, 'week');
	}
	const firstSundayOffset = Math.abs(
		firstSundayForCalendar.diff(currentStartOfMonth.startOf('month'), 'day')
	);

	let lastSaturdayForCalendar = currentStartOfMonth.endOf('week');
	while (
		lastSaturdayForCalendar.month() === currentStartOfMonth.month() &&
		lastSaturdayForCalendar.date() !== daysInMonth
	) {
		lastSaturdayForCalendar = lastSaturdayForCalendar.add(1, 'week');
	}
	const lastSaturdayOffset = lastSaturdayForCalendar.diff(
		currentStartOfMonth.endOf('month'),
		'day'
	);

	const attendanceDailyStatusesOfMonthQuery = useQuery(
		['DailyAttendanceStatusesOfMonth', { date: currentStartOfMonth }],
		async () => {
			const res = await API.get(
				`Attendances/DailyAttendanceStatusesOfMonth?date=${currentStartOfMonth.toISOString()}`
			);

			const data: DailyStatus_API_Response = res.data;

			return data;
		}
	);

	// Get # of days that are Pending
	// and should be REJECTED (because it is past today and can't be Accepted)
	// Doesn't include today
	const daysToUpdate =
		attendanceDailyStatusesOfMonthQuery.data?.filter((dailyStatus, index) => {
			const iterDateOfMonth = index + 1;
			const currentDateOfMonth = dayjs().date();

			return (
				dailyStatus === DailyStatus.Pending
				// && iterDateOfMonth !== currentDateOfMonth
			);
		}).length ?? 0;

	// console.table({
	// 	currentDateStartWeek: currentDate.startOf('week').toDate(),
	// 	currentDateStartMonth: currentDate.startOf('month').toDate(),
	// 	firstSundayForCalendar: firstSundayForCalendar.toDate(),
	// 	firstSundayOffset,
	// 	currentDateEndWeek: currentDate.endOf('week').toDate(),
	// 	currentDateEndMonth: currentDate.endOf('month').toDate(),
	// 	lastSaturdayForCalendar: lastSaturdayForCalendar.toDate(),
	// 	lastSaturdayOffset,
	// });

	function handleChangeMonth(direction: 'prev' | 'next') {
		const currentDate = searchParams.get('date')
			? dayjs(searchParams.get('date'), 'DD-MM-YYYY').startOf('month')
			: dayjs().startOf('month');
		const newDate =
			direction === 'next'
				? currentDate.add(1, 'month')
				: currentDate.subtract(1, 'month');
		const newQueryParams = QueryString.stringify({
			date: newDate.format('DD-MM-YYYY'),
		});

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
		<div className='flex flex-row'>
			<div>
				<p className='mb-4 text-h1'>Chấm công</p>
				<BatchUpdateMonthSection days={daysToUpdate} />
				<div className='my-4 flex w-full flex-row items-center justify-start gap-4'>
					<ArrowSmallIcon
						className='cursor-pointer rounded border border-black bg-neutral-white fill-neutral-black'
						direction='left'
						size={32}
						onClick={() => handleChangeMonth('prev')}
					/>
					<p className='text-h2 font-bold'>
						Tháng {currentStartOfMonth.format('M/YYYY')}
					</p>
					<ArrowSmallIcon
						disabled={currentStartOfMonth.isSame(dayjs(), 'month')}
						className='cursor-pointer rounded border border-black bg-neutral-white fill-neutral-black'
						direction='right'
						size={32}
						onClick={() => handleChangeMonth('next')}
					/>
				</div>
				<div className='flex h-full w-72 flex-row flex-wrap content-start items-start'>
					{/* CN - T7 headers */}
					{range(0, 7).map((weekday, index) => {
						return (
							<p
								key={index}
								className={
									' h-10 w-10 border-t border-l border-black bg-secondary-dark-1 text-center text-neutral-gray-2 last:border-r ' +
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
								key={index}
								className={` h-10 w-10 cursor-not-allowed border-t border-l border-black bg-neutral-gray-6 text-center text-neutral-gray-4`}
							>
								{day}
							</div>
						);
					})}
					{/* This month's days */}
					{range(0, daysInMonth).map((_, index) => {
						const dailyStatus = attendanceDailyStatusesOfMonthQuery.data[index];
						const day = currentStartOfMonth.startOf('month').add(index, 'day');
						const isWeekend = day.day() === 0 || day.day() === 6;
						const isClickableDay = !isWeekend;
						/* dailyStatus === DailyStatus.Empty || isWeekend */
						const isToday = day.isSame(dayjs(), 'day');
						const hasRightBorder = day.day() === 6;
						const hasBottomBorder = day.isAfter(
							currentStartOfMonth
								.endOf('month')
								.subtract(7 - lastSaturdayOffset, 'day'),
							'day'
						);
						return (
							<div
								key={index}
								className={` h-10 w-10 border-t border-l border-black text-center ${
									isClickableDay
										? ` cursor-pointer ${
												dailyStatus === DailyStatus.Empty
													? ' bg-neutral-gray-2 hover:bg-neutral-gray-4 '
													: dailyStatus === DailyStatus.Finished
													? ' bg-primary-bright-4 hover:bg-primary-bright-3 '
													: ' bg-state-warning-bright-3 hover:bg-state-warning-bright-2 '
												// dailyStatus === DailyStatus.Finished
												// 	? ' bg-primary-bright-4 hover:bg-primary-bright-1 '
												// 	: dailyStatus === DailyStatus.Pending
												// 	? ' bg-accent-bright-1 hover:bg-accent-normal '
												// 	: dailyStatus === DailyStatus.Empty
												// 	? ' bg-primary-bright-7 hover:bg-primary-bright-5 '
												// 	: 'THIS-IS-WRONG!!! bg-yellow-700'
										  }`
										: ' cursor-not-allowed bg-neutral-gray-6 text-neutral-gray-4 '
								} ${isToday && ' font-bold '} ${hasRightBorder && 'border-r'} ${
									hasBottomBorder && 'border-b'
								}`}
								onClick={
									isClickableDay ? () => handleChooseDay(day) : undefined
								}
							>
								{day.date()}
							</div>
						);
					})}
					{/* Next month's days */}
					{range(0, lastSaturdayOffset).map((_, index) => {
						const day = index + 1;
						return (
							<div
								key={index}
								className='h-10 w-10 cursor-not-allowed border-t border-l border-b border-black bg-neutral-gray-6 text-center text-neutral-gray-4 last-of-type:border-r'
							>
								{day}
							</div>
						);
					})}
				</div>
			</div>

			<div className='flex flex-col items-start gap-2 self-center'>
				<div className='flex flex-row items-center justify-start gap-2'>
					<div className='h-8 w-8 border border-neutral-black bg-primary-bright-4' />
					<p>Ngày đã hoàn tất kiểm tra chấm công</p>
				</div>
				<div className='flex flex-row items-center justify-start gap-2'>
					<div className='h-8 w-8 border border-neutral-black bg-state-warning-bright-3' />
					<p>Ngày cần kiểm tra chấm công</p>
				</div>
			</div>
		</div>
	);
};
