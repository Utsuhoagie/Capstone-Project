import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';
import { Applicant } from './ApplicantTracking.interface';
import { DisplayConfigs } from '../../app/App.display';
import {
	APPLICANT_TRACKING_FIELDS,
	APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
	APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
	APPLICANT_TRACKING_FORMATTERS,
	APPLICANT_TRACKING_LABELLERS,
	APPLICANT_TRACKING_MAPPERS,
} from './ApplicantTracking.display';

interface ApplicantTrackingStore {
	// Server state
	applicants: Applicant[]; // NOTE: should be paginated (e.g 10 only)
	setApplicants: (_applicants: Applicant[]) => void;

	// Client state
	selectedApplicant: Applicant | undefined;
	setSelectedApplicant: (_applicant: Applicant | undefined) => void;
	displayConfigs: DisplayConfigs;
	// setDisplayConfigs: (_displayConfigs: DisplayConfigs) => void;
}

export const useApplicantTrackingStore = create<ApplicantTrackingStore>()(
	devtools((set) => ({
		// Server state
		applicants: [],
		setApplicants: (_applicants: Applicant[]) =>
			set((prev) => {
				let next = clone(prev);
				next.applicants = _applicants;
				return next;
			}),

		// Client state
		selectedApplicant: undefined,
		setSelectedApplicant: (_applicant: Applicant | undefined) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedApplicant = _applicant;
				return next;
			}),

		displayConfigs: {
			fields: APPLICANT_TRACKING_FIELDS,
			labellers: APPLICANT_TRACKING_LABELLERS,
			displayModeMappers: APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
			mappers: APPLICANT_TRACKING_MAPPERS,
			formattableFieldMappers: APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
			formatters: APPLICANT_TRACKING_FORMATTERS,
		},
		// setDisplayConfigs: (_displayConfigs: DisplayConfigs) =>
		// 	set((prev) => {
		// 		let next = clone(prev);
		// 		next.displayConfigs = _displayConfigs;
		// 		return next;
		// 	}),
	}))
);
