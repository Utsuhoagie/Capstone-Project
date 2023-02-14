import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';

interface TableStore {
	selectedRowIndex?: number;

	setSelectedRowIndex: (index: number) => void;
}

export const useTableStore = create<TableStore>()(
	devtools((set) => ({
		selectedRowIndex: undefined,

		setSelectedRowIndex: (index: number) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedRowIndex = index;
				return next;
			}),
	}))
);
