import dayjs from 'dayjs';
import QueryString from 'query-string';
import { omit } from 'ramda';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../app/App';
import { useToastStore } from '../../app/App.store';
import {
	PagedResult,
	Pagination,
} from '../../components/organisms/Table/Pagination/Pagination.interface';
import { useTableStore } from '../../components/organisms/Table/Table.store';
import { useRefresh } from '../auth/Auth.hooks';
import { useAuthStore } from '../auth/Auth.store';
import {
	Position,
	Position_API_Response,
} from '../position/Position.interface';
import { usePositionStore } from '../position/Position.store';
import {
	Applicant,
	Applicant_API_Response,
	mapToApplicant,
} from './Applicant.interface';
import { useApplicantStore } from './Applicant.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';

export const ApplicantModule = () => {
	const navigate = useNavigate();
	const { accessToken, refreshToken, setTokens, unsetLogin } = useAuthStore();
	// TODO: should ideally NOT refresh every time
	useRefresh();

	const [searchParams, setSearchParams] = useSearchParams();
	const { showToast } = useToastStore();
	const { selectedRowIndex, pagination, setPagination } = useTableStore();
	const { visibleApplicants, setVisibleApplicants, setSelectedApplicant } =
		useApplicantStore();
	const { setAllPositions } = usePositionStore();

	const currentQueryParams = QueryString.parse(searchParams.toString());
	const allQueryParams = {
		page: pagination.CurrentPage,
		pageSize: pagination.PageSize,
		...currentQueryParams,
	};

	const { isLoading, error, data } = useQuery(
		// ['applicants', currentPageIndex],
		['applicants', allQueryParams],
		async () => {
			const allQueryParamsAsQueryString = QueryString.stringify(allQueryParams);
			const res = await fetch(
				`${BASE_URL}/Applicants?${allQueryParamsAsQueryString}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const pagedResponse: PagedResult<Applicant_API_Response> =
				await res.json();
			console.log('Paged API response: ', pagedResponse);

			const responsePagination: Pagination = omit(['Items'], pagedResponse);
			setPagination(responsePagination);

			const responseVisibleApplicants: Applicant[] = pagedResponse.Items.map(
				(Item) => mapToApplicant(Item)
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
