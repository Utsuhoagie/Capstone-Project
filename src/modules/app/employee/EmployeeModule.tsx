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
import {
	Employee,
	Employee_API_Response,
	mapToEmployee,
} from './Employee.interface';
import { useEmployeeStore } from './Employee.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';
import { BASE_URL } from '../../app/App';
import { useAuthStore } from '../auth/Auth.store';
import { useRefresh } from '../auth/Auth.hooks';

export const EmployeeModule = () => {
	const navigate = useNavigate();
	const { accessToken, refreshToken, setTokens } = useAuthStore();
	useRefresh();

	const [searchParams, setSearchParams] = useSearchParams();

	const { selectedRowIndex, pagination, setPagination } = useTableStore();
	const { visibleEmployees, setVisibleEmployees, setSelectedEmployee } =
		useEmployeeStore();

	const currentQueryParams = QueryString.parse(searchParams.toString());
	const allQueryParams = {
		page: pagination.CurrentPage,
		pageSize: pagination.PageSize,
		...currentQueryParams,
	};

	const { isLoading, error, data } = useQuery(
		['employees', allQueryParams],
		async () => {
			const allQueryParamsAsQueryString = QueryString.stringify(allQueryParams);
			const res = await fetch(
				`${BASE_URL}/Employees?${allQueryParamsAsQueryString}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			const pagedResponse: PagedResult<Employee_API_Response> =
				await res.json();
			console.log('Paged API response: ', pagedResponse);

			const responsePagination: Pagination = omit(['Items'], pagedResponse);
			setPagination(responsePagination);

			const responseVisibleEmployees: Employee[] = pagedResponse.Items.map(
				(Item) => mapToEmployee(Item)
			);
			setVisibleEmployees(responseVisibleEmployees);
		},
		{ keepPreviousData: true, staleTime: 0, refetchOnWindowFocus: false }
	);

	// Whenever clicking a table row
	useEffect(() => {
		if (selectedRowIndex === undefined) {
			setSelectedEmployee(undefined);
			return;
		}
		const selectedEmployee = visibleEmployees[selectedRowIndex];
		setSelectedEmployee(selectedEmployee);
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
			<h1 className='text-h1'>Quản lý hồ sơ Nhân viên</h1>
			<DataTable />
			<div className='flex flex-row gap-4'>
				<DetailSection />
				<ButtonSection />
			</div>
		</div>
	);
};
