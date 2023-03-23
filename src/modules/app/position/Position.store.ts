import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';
import { Position } from './Position.interface';
import { DisplayConfigs } from '../../../app/App.display';
import {
	POSITION_FIELDS,
	POSITION_DISPLAY_MODE_MAPPERS,
	POSITION_FORMATTABLE_FIELD_MAPPERS,
	POSITION_FORMATTERS,
	POSITION_LABELLERS,
	POSITION_MAPPERS,
} from './Position.display';

interface PositionStore {
	// Server state
	allPositions: Position[];
	setAllPositions: (_allPositions: Position[]) => void;
	visiblePositions: Position[];
	setVisiblePositions: (_visiblePositions: Position[]) => void;

	// Client state
	/* positionsOnPage: Position[];
	setPositionsOnPage: (_positionsOnPage: Position[]) => void; */
	selectedPosition: Position | undefined;
	setSelectedPosition: (_position: Position | undefined) => void;
	displayConfigs: DisplayConfigs;
	// setDisplayConfigs: (_displayConfigs: DisplayConfigs) => void;
}

export const usePositionStore = create<PositionStore>()(
	devtools((set) => ({
		// Server state
		allPositions: [],
		setAllPositions: (_allPositions: Position[]) =>
			set((prev) => {
				let next = clone(prev);
				next.allPositions = _allPositions;
				return next;
			}),
		visiblePositions: [],
		setVisiblePositions: (_visiblePositions: Position[]) =>
			set((prev) => {
				let next = clone(prev);
				next.visiblePositions = _visiblePositions;
				return next;
			}),

		// Client state
		/* positionsOnPage: [],
		setPositionsOnPage: (_positionsOnPage: Position[]) =>
			set((prev) => {
				let next = clone(prev);
				next.positionsOnPage = _positionsOnPage;
				return next;
			}), */
		selectedPosition: undefined,
		setSelectedPosition: (_position: Position | undefined) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedPosition = _position;
				return next;
			}),

		displayConfigs: {
			fields: POSITION_FIELDS,
			labellers: POSITION_LABELLERS,
			displayModeMappers: POSITION_DISPLAY_MODE_MAPPERS,
			mappers: POSITION_MAPPERS,
			formattableFieldMappers: POSITION_FORMATTABLE_FIELD_MAPPERS,
			formatters: POSITION_FORMATTERS,
		},
		// setDisplayConfigs: (_displayConfigs: DisplayConfigs) =>
		// 	set((prev) => {
		// 		let next = clone(prev);
		// 		next.displayConfigs = _displayConfigs;
		// 		return next;
		// 	}),
	}))
);
