import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';
import { Pagination } from './Pagination/Pagination.interface';
import { PAGE_SIZE } from './Pagination/Pagination.constants';

interface TableStore {
	selectedRowIndex?: number;
	pagination: Pagination;

	setSelectedRowIndex: (index: number | undefined) => void;
	setPagination: (_pagination: Pagination) => void;
}

export const useTableStore = create<TableStore>()(
	devtools((set) => ({
		selectedRowIndex: undefined,
		pagination: {
			Count: 0,
			CurrentPage: 1,
			PageSize: PAGE_SIZE,
			TotalCount: 0,
			TotalPages: 1,
			HasPrevious: false,
			HasNext: false,
		},

		setSelectedRowIndex: (index: number | undefined) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedRowIndex = index;
				return next;
			}),
		setPagination: (_pagination: Pagination) =>
			set((prev) => {
				let next = clone(prev);
				next.pagination = _pagination;
				return next;
			}),
	}))
);
