import { omit } from 'ramda';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
	PagedResult,
	Pagination,
} from '../../components/organisms/Table/Pagination/Pagination.interface';
import { useTableStore } from '../../components/organisms/Table/Table.store';
import { useAuthStore } from '../auth/Auth.store';
import { Position, Position_API_Response } from './Position.interface';
import { usePositionStore } from './Position.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';
import { BASE_URL } from '../../app/App';

export const PositionModule = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const { selectedRowIndex, setPagination } = useTableStore();
	const { visiblePositions, setVisiblePositions, setSelectedPosition } =
		usePositionStore();

	const { isLoading, error, data } = useQuery(
		'positions',
		async () => {
			const res = await fetch(`${BASE_URL}/Positions`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			const pagedResponse: PagedResult<Position_API_Response> =
				await res.json();
			console.log('Paged API response: ', pagedResponse);

			const responsePagination: Pagination = omit(['Items'], pagedResponse);
			setPagination(responsePagination);

			const responseVisiblePositions: Position[] = pagedResponse.Items;
			setVisiblePositions(responseVisiblePositions);
		},
		{ keepPreviousData: true, staleTime: 0, refetchOnWindowFocus: false }
	);

	// Whenever clicking a table row
	useEffect(() => {
		if (selectedRowIndex === undefined) {
			setSelectedPosition(undefined);
			return;
		}
		const selectedPosition = visiblePositions[selectedRowIndex];
		setSelectedPosition(selectedPosition);
	}, [selectedRowIndex]);

	if (isLoading) return <p>'Loading...'</p>;

	if (error) return <p>Error! {JSON.stringify(error)}</p>;

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Quản lý các Vị trí</h1>
			<DataTable />
			<div className='flex flex-row gap-4'>
				<DetailSection />
				<ButtonSection />
			</div>
		</div>
	);
};
