import dayjs from 'dayjs';
import { clone, omit } from 'ramda';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../components/organisms/Table/Pagination/Pagination.constants';
import {
	PagedResult,
	Pagination,
} from '../../components/organisms/Table/Pagination/Pagination.interface';
import { useTableStore } from '../../components/organisms/Table/Table.store';
import {
	Applicant,
	Applicant_APIResponse,
} from './ApplicantTracking.interface';
import { useApplicantTrackingStore } from './ApplicantTracking.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';

export const ApplicantTracking = () => {
	const navigate = useNavigate();

	const [searchParams, _] = useSearchParams();
	const currentPageString = searchParams.get('page') ?? '1';
	const currentPageIndex = parseInt(currentPageString);
	console.log({ currentPageIndex });

	const { selectedRowIndex, pagination, setPagination } = useTableStore();
	const {
		allApplicants,
		setAllApplicants,
		applicantsOnPage,
		setApplicantsOnPage,
		setSelectedApplicant,
	} = useApplicantTrackingStore();

	const { isLoading, error, data } = useQuery(
		'applicant-tracking',
		async () => {
			const res = await fetch('https://localhost:5000/api/ApplicantTracking');

			const pagedResponse: PagedResult<Applicant_APIResponse> =
				await res.json();

			console.log('API response for ALL: ', pagedResponse);

			const pagination: Pagination = omit(['Items'], pagedResponse);

			setPagination(pagination);

			const allApplicants: Applicant[] = pagedResponse.Items.map((Item) => ({
				...Item,
				BirthDate: Item.BirthDate ? dayjs(Item.BirthDate).toDate() : undefined,
				Email: Item.Email ?? undefined,
				AppliedDate: dayjs(Item.AppliedDate).toDate(),
			}));

			setAllApplicants(allApplicants);

			const currentPageIndex0Based = currentPageIndex - 1;
			const pageSize = pagination.PageSize;
			const applicantsOnPage: Applicant[] = clone(allApplicants).slice(
				currentPageIndex0Based * pageSize,
				currentPageIndex0Based * pageSize + pageSize
			);

			setApplicantsOnPage(applicantsOnPage);
		},
		{ keepPreviousData: true }
	);

	/* 	useQuery(
		['applicant-tracking', currentPage],
		async () => {
			const fetchURL =
				'https://localhost:5000/api/ApplicantTracking' +
				(currentPage !== 1 ? `?page=${currentPage}&pageSize=${PAGE_SIZE}` : '');
			const res = await fetch(fetchURL);

			const pagedResponse: PagedResult<Applicant_APIResponse> =
				await res.json();

			console.log('API response ', pagedResponse);

			const pagination: Pagination = omit(['Items'], pagedResponse);

			setPagination(pagination);

			const allApplicants: Applicant[] = pagedResponse.Items.map((Item) => ({
				...Item,
				BirthDate: Item.BirthDate ? dayjs(Item.BirthDate).toDate() : undefined,
				Email: Item.Email ?? undefined,
				AppliedDate: dayjs(Item.AppliedDate).toDate(),
			}));

			const currentPageIndex0Based = pagination.CurrentPage - 1;
			const pageSize = pagination.PageSize;
			const applicantsOnPage: Applicant[] = clone(allApplicants).slice(
				currentPageIndex0Based * pageSize,
				currentPageIndex0Based * pageSize + pageSize
			);

			setAllApplicants(allApplicants);
			setApplicantsOnPage(applicantsOnPage);
		},
		{ keepPreviousData: true }
	); */

	useEffect(() => {
		if (selectedRowIndex === undefined) {
			setSelectedApplicant(undefined);
			return;
		}
		const selectedApplicant = applicantsOnPage[selectedRowIndex];
		setSelectedApplicant(selectedApplicant);
	}, [selectedRowIndex]);

	useEffect(() => {
		const page = searchParams.get('page');

		const currentPageIndex = parseInt(page ?? '1');
		const currentPageIndex0Based = currentPageIndex - 1;
		const pageSize = pagination.PageSize;
		const applicantsOnPage: Applicant[] = clone(allApplicants).slice(
			currentPageIndex0Based * pageSize,
			currentPageIndex0Based * pageSize + pageSize
		);

		// console.log({ applicantsOnPage });

		setApplicantsOnPage(applicantsOnPage);

		const newPagination: Pagination = {
			...pagination,
			CurrentPage: currentPageIndex,
			HasNext: currentPageIndex < pagination.TotalPages,
			HasPrevious: currentPageIndex > 1,
		};

		setPagination(newPagination);

		if (page !== null) {
			navigate(`?page=${page}`);
		}
	}, [searchParams]);

	if (isLoading) return <p>'Loading...'</p>;

	if (error) return <p>Error! {JSON.stringify(error)}</p>;

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Quản lý hồ sơ Ứng viên</h1>
			<DataTable />
			<div className='flex flex-row gap-4'>
				<DetailSection />
				<ButtonSection />
			</div>
		</div>
	);
};
