import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';
import { Feedback } from './Feedback.interface';
import { DisplayConfigs } from '../../../app/App.display';
import {
	FEEDBACK_FIELDS,
	FEEDBACK_DISPLAY_MODE_MAPPERS,
	FEEDBACK_FORMATTABLE_FIELD_MAPPERS,
	FEEDBACK_FORMATTERS,
	FEEDBACK_LABELLERS,
	FEEDBACK_MAPPERS,
} from './Feedback.display';

interface FeedbackStore {
	// Server state
	allFeedbacks: Feedback[];
	setAllFeedbacks: (_allFeedbacks: Feedback[]) => void;
	visibleFeedbacks: Feedback[];
	setVisibleFeedbacks: (_visibleFeedbacks: Feedback[]) => void;

	// Client state
	/* positionsOnPage: Feedback[];
	setFeedbacksOnPage: (_positionsOnPage: Feedback[]) => void; */
	selectedFeedback: Feedback | undefined;
	setSelectedFeedback: (_position: Feedback | undefined) => void;
	displayConfigs: DisplayConfigs;
	// setDisplayConfigs: (_displayConfigs: DisplayConfigs) => void;
}

export const useFeedbackStore = create<FeedbackStore>()(
	devtools((set) => ({
		// Server state
		allFeedbacks: [],
		setAllFeedbacks: (_allFeedbacks: Feedback[]) =>
			set((prev) => {
				let next = clone(prev);
				next.allFeedbacks = _allFeedbacks;
				return next;
			}),
		visibleFeedbacks: [],
		setVisibleFeedbacks: (_visibleFeedbacks: Feedback[]) =>
			set((prev) => {
				let next = clone(prev);
				next.visibleFeedbacks = _visibleFeedbacks;
				return next;
			}),

		// Client state
		/* positionsOnPage: [],
		setFeedbacksOnPage: (_positionsOnPage: Feedback[]) =>
			set((prev) => {
				let next = clone(prev);
				next.positionsOnPage = _positionsOnPage;
				return next;
			}), */
		selectedFeedback: undefined,
		setSelectedFeedback: (_position: Feedback | undefined) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedFeedback = _position;
				return next;
			}),

		displayConfigs: {
			fields: FEEDBACK_FIELDS,
			labellers: FEEDBACK_LABELLERS,
			displayModeMappers: FEEDBACK_DISPLAY_MODE_MAPPERS,
			mappers: FEEDBACK_MAPPERS,
			formattableFieldMappers: FEEDBACK_FORMATTABLE_FIELD_MAPPERS,
			formatters: FEEDBACK_FORMATTERS,
		},
		// setDisplayConfigs: (_displayConfigs: DisplayConfigs) =>
		// 	set((prev) => {
		// 		let next = clone(prev);
		// 		next.displayConfigs = _displayConfigs;
		// 		return next;
		// 	}),
	}))
);
