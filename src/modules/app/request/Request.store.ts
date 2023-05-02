import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';
import { Request } from './Request.interface';
import { DisplayConfigs } from '../../../app/App.display';
import {
	REQUEST_FIELDS,
	REQUEST_DISPLAY_MODE_MAPPERS,
	REQUEST_FORMATTABLE_FIELD_MAPPERS,
	REQUEST_FORMATTERS,
	REQUEST_LABELLERS,
	REQUEST_MAPPERS,
} from './Request.display';

interface RequestStore {
	// Server state
	allRequests: Request[];
	setAllRequests: (_allRequests: Request[]) => void;
	visibleRequests: Request[];
	setVisibleRequests: (_visibleRequests: Request[]) => void;

	// Client state
	/* positionsOnPage: Request[];
	setRequestsOnPage: (_positionsOnPage: Request[]) => void; */
	selectedRequest: Request | undefined;
	setSelectedRequest: (_position: Request | undefined) => void;
	displayConfigs: DisplayConfigs;
	// setDisplayConfigs: (_displayConfigs: DisplayConfigs) => void;
}

export const useRequestStore = create<RequestStore>()(
	devtools((set) => ({
		// Server state
		allRequests: [],
		setAllRequests: (_allRequests: Request[]) =>
			set((prev) => {
				let next = clone(prev);
				next.allRequests = _allRequests;
				return next;
			}),
		visibleRequests: [],
		setVisibleRequests: (_visibleRequests: Request[]) =>
			set((prev) => {
				let next = clone(prev);
				next.visibleRequests = _visibleRequests;
				return next;
			}),

		// Client state
		/* positionsOnPage: [],
		setRequestsOnPage: (_positionsOnPage: Request[]) =>
			set((prev) => {
				let next = clone(prev);
				next.positionsOnPage = _positionsOnPage;
				return next;
			}), */
		selectedRequest: undefined,
		setSelectedRequest: (_position: Request | undefined) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedRequest = _position;
				return next;
			}),

		displayConfigs: {
			fields: REQUEST_FIELDS,
			labellers: REQUEST_LABELLERS,
			displayModeMappers: REQUEST_DISPLAY_MODE_MAPPERS,
			mappers: REQUEST_MAPPERS,
			formattableFieldMappers: REQUEST_FORMATTABLE_FIELD_MAPPERS,
			formatters: REQUEST_FORMATTERS,
		},
		// setDisplayConfigs: (_displayConfigs: DisplayConfigs) =>
		// 	set((prev) => {
		// 		let next = clone(prev);
		// 		next.displayConfigs = _displayConfigs;
		// 		return next;
		// 	}),
	}))
);
