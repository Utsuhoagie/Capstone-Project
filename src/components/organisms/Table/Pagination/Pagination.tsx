import QueryString from 'query-string';
import { useSearchParams } from 'react-router-dom';
import { useTableStore } from '../Table.store';
import {
	MAX_PAGES_AFTER_INPUT,
	MAX_PAGES_BEFORE_INPUT,
	MAX_PAGES_WITHOUT_INPUT,
} from './Pagination.constants';
import { PaginationButton } from './PaginationButton';
import { PaginationInputButton } from './PaginationInputButton';

export const Pagination = () => {
	const { pagination, setPagination } = useTableStore();
	const [searchParams, setSearchParams] = useSearchParams();

	const hasPaginationInput = pagination.TotalPages > MAX_PAGES_WITHOUT_INPUT;

	const pagesFillerWithoutInput = !hasPaginationInput
		? Array(pagination.TotalPages).fill(undefined)
		: undefined;
	const pagesFillerWithInput = hasPaginationInput
		? {
				before: Array(MAX_PAGES_BEFORE_INPUT).fill(undefined),
				after: Array(MAX_PAGES_AFTER_INPUT).fill(undefined),
		  }
		: undefined;

	return (
		<div className='mt-2 flex flex-row justify-start gap-2'>
			<PaginationButton
				content='prev'
				disabled={!pagination.HasPrevious}
				onClick={() => {
					const currentParams = QueryString.parse(searchParams.toString());
					const nextParams = {
						...currentParams,
						page: pagination.CurrentPage - 1,
					};

					console.log(nextParams);
					setSearchParams(QueryString.stringify(nextParams));
				}}
			/>

			{!hasPaginationInput &&
				pagesFillerWithoutInput!.map((_, index) => {
					const pageIndex = index + 1;

					return (
						<PaginationButton
							key={pageIndex}
							active={pagination.CurrentPage === pageIndex}
							content={pageIndex}
							onClick={() => {
								const currentParams = QueryString.parse(
									searchParams.toString()
								);
								const nextParams = {
									...currentParams,
									page: pageIndex,
								};

								console.log(nextParams);
								setSearchParams(QueryString.stringify(nextParams));
							}}
						/>
					);
				})}

			{hasPaginationInput && (
				<>
					{pagesFillerWithInput!.before.map((_, index) => {
						const pageIndex = index + 1;
						return (
							<PaginationButton
								key={pageIndex}
								active={pagination.CurrentPage === pageIndex}
								content={pageIndex}
								onClick={() => {
									const currentParams = QueryString.parse(
										searchParams.toString()
									);
									const nextParams = {
										...currentParams,
										page: pageIndex,
									};

									setSearchParams(QueryString.stringify(nextParams));
								}}
							/>
						);
					})}

					<PaginationInputButton placeholder='Nhập số trang' />

					{pagesFillerWithInput!.after.map((_, index) => {
						const pageIndex =
							pagination.TotalPages - MAX_PAGES_AFTER_INPUT + index + 1;
						return (
							<PaginationButton
								key={pageIndex}
								active={pagination.CurrentPage === pageIndex}
								content={pageIndex}
								onClick={() => {
									const currentParams = QueryString.parse(
										searchParams.toString()
									);
									const nextParams = {
										...currentParams,
										page: pageIndex,
									};

									setSearchParams(QueryString.stringify(nextParams));
								}}
							/>
						);
					})}
				</>
			)}

			<PaginationButton
				content='next'
				disabled={!pagination.HasNext}
				onClick={() => {
					const currentParams = QueryString.parse(searchParams.toString());
					const nextParams = {
						...currentParams,
						page: pagination.CurrentPage + 1,
					};

					console.log(nextParams);
					setSearchParams(QueryString.stringify(nextParams));
				}}
			/>
		</div>
	);
};
