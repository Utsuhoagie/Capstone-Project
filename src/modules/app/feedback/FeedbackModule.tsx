import { omit } from 'ramda';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
	PagedResult,
	Pagination,
} from '../../../components/organisms/Table/Pagination/Pagination.interface';
import { useTableStore } from '../../../components/organisms/Table/Table.store';
import {
	mapToFeedback,
	Feedback,
	Feedback_API_Response,
} from './Feedback.interface';
import { useFeedbackStore } from './Feedback.store';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';
import { API } from '../../../config/axios/axios.config';
import { useSearchParams } from 'react-router-dom';
import QueryString from 'query-string';

export const FeedbackModule = () => {
	const { selectedRowIndex, pagination, setPagination } = useTableStore();
	const { visibleFeedbacks, setVisibleFeedbacks, setSelectedFeedback } =
		useFeedbackStore();

	const [searchParams, setSearchParams] = useSearchParams();
	const currentQueryParams = QueryString.parse(searchParams.toString());
	const allQueryParams = {
		page: pagination.CurrentPage,
		pageSize: pagination.PageSize,
		...currentQueryParams,
	};

	const { isLoading, error, data } = useQuery(
		['positions', allQueryParams],
		async () => {
			const allQueryParamsAsQueryString = QueryString.stringify(allQueryParams);
			const res = await API.get(`Feedbacks?${allQueryParamsAsQueryString}`);

			const pagedResponse: PagedResult<Feedback_API_Response> = await res.data;
			console.log('Paged API response: ', pagedResponse);

			const responsePagination: Pagination = omit(['Items'], pagedResponse);
			setPagination(responsePagination);

			const responseVisibleFeedbacks: Feedback[] = pagedResponse.Items.map(
				(Item) => mapToFeedback(Item)
			);
			setVisibleFeedbacks(responseVisibleFeedbacks);
		},
		{ keepPreviousData: true, staleTime: 0, refetchOnWindowFocus: false }
	);

	// Whenever clicking a table row
	useEffect(() => {
		if (selectedRowIndex === undefined) {
			setSelectedFeedback(undefined);
			return;
		}
		const selectedFeedback = visibleFeedbacks[selectedRowIndex];
		setSelectedFeedback(selectedFeedback);
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

	if (isLoading) return <p>Loading...</p>;

	if (error) return <p>Error! {JSON.stringify(error)}</p>;

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Hòm thư góp ý</h1>
			<DataTable />
			<DetailSection />
		</div>
	);
};
