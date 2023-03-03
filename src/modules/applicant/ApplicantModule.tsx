import dayjs from 'dayjs';
import QueryString from 'query-string';
import { clone, omit } from 'ramda';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	PagedResult,
	Pagination,
} from '../../components/organisms/Table/Pagination/Pagination.interface';
import { useTableStore } from '../../components/organisms/Table/Table.store';
import { Applicant, Applicant_APIResponse } from './Applicant.interface';
import { useApplicantStore } from './Applicant.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';

export const ApplicantModule = () => {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const { selectedRowIndex, pagination, setPagination } = useTableStore();
	const { visibleApplicants, setVisibleApplicants, setSelectedApplicant } =
		useApplicantStore();

	const currentQueryParams = QueryString.parse(searchParams.toString());
	const allQueryParams = {
		page: pagination.CurrentPage,
		pageSize: pagination.PageSize,
		...currentQueryParams,
	};

	const { isLoading, error, data } = useQuery(
		// ['applicant', currentPageIndex],
		['applicants', allQueryParams],
		async () => {
			const allQueryParamsAsQueryString = QueryString.stringify(allQueryParams);
			const res = await fetch(
				`https://localhost:5000/api/Applicants?${allQueryParamsAsQueryString}`
			);

			const pagedResponse: PagedResult<Applicant_APIResponse> =
				await res.json();
			console.log('Paged API response: ', pagedResponse);

			const responsePagination: Pagination = omit(['Items'], pagedResponse);
			setPagination(responsePagination);

			const responseVisibleApplicants: Applicant[] = pagedResponse.Items.map(
				(Item) => ({
					...Item,
					BirthDate: Item.BirthDate
						? dayjs(Item.BirthDate).toDate()
						: undefined,
					Email: Item.Email ?? undefined,
					AppliedDate: dayjs(Item.AppliedDate).toDate(),
				})
			);
			setVisibleApplicants(responseVisibleApplicants);
		},
		{ keepPreviousData: true, staleTime: 0, refetchOnWindowFocus: false }
	);

	// Whenever clicking a table row
	useEffect(() => {
		if (selectedRowIndex === undefined) {
			setSelectedApplicant(undefined);
			return;
		}
		const selectedApplicant = visibleApplicants[selectedRowIndex];
		setSelectedApplicant(selectedApplicant);
	}, [selectedRowIndex]);

	// Whenever query params change
	useEffect(() => {
		console.log(
			'Effect SearchParams, searchParams = ',
			searchParams.toString()
		);
		const pageParam = searchParams.get('page') ?? '1';
		const currentPageIndex = parseInt(pageParam);

		const newPagination: Pagination = {
			...pagination,
			CurrentPage: currentPageIndex,
			HasNext: currentPageIndex < pagination.TotalPages,
			HasPrevious: currentPageIndex > 1,
		};

		setPagination(newPagination);

		// setSearchParams((prev) => ({
		// 	...prev,
		// 	page: pageParam,
		// }));
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
