import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';
import { Attendance } from './Attendance.interface';
import { DisplayConfigs } from '../../../app/App.display';
// import {
// 	APPLICANT_FIELDS,
// 	APPLICANT_DISPLAY_MODE_MAPPERS,
// 	APPLICANT_FORMATTABLE_FIELD_MAPPERS,
// 	APPLICANT_FORMATTERS,
// 	APPLICANT_LABELLERS,
// 	APPLICANT_MAPPERS,
// } from './Applicant.display';

interface ApplicantStore {
	// Server state
	visibleApplicants: Attendance[];
	setVisibleApplicants: (_applicants: Attendance[]) => void;

	// Client state
	/* applicantsOnPage: Applicant[];
	setApplicantsOnPage: (_applicantsOnPage: Applicant[]) => void; */
	selectedApplicant: Attendance | undefined;
	setSelectedApplicant: (_applicant: Attendance | undefined) => void;
	// displayConfigs: DisplayConfigs;
	// setDisplayConfigs: (_displayConfigs: DisplayConfigs) => void;
}

export const useApplicantStore = create<ApplicantStore>()(
	devtools((set) => ({
		// Server state
		visibleApplicants: [],
		setVisibleApplicants: (_visibleApplicants: Attendance[]) =>
			set((prev) => {
				let next = clone(prev);
				next.visibleApplicants = _visibleApplicants;
				return next;
			}),

		// Client state
		/* applicantsOnPage: [],
		setApplicantsOnPage: (_applicantsOnPage: Applicant[]) =>
			set((prev) => {
				let next = clone(prev);
				next.applicantsOnPage = _applicantsOnPage;
				return next;
			}), */
		selectedApplicant: undefined,
		setSelectedApplicant: (_applicant: Attendance | undefined) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedApplicant = _applicant;
				return next;
			}),

		// displayConfigs: {
		// 	fields: APPLICANT_FIELDS,
		// 	labellers: APPLICANT_LABELLERS,
		// 	displayModeMappers: APPLICANT_DISPLAY_MODE_MAPPERS,
		// 	mappers: APPLICANT_MAPPERS,
		// 	formattableFieldMappers: APPLICANT_FORMATTABLE_FIELD_MAPPERS,
		// 	formatters: APPLICANT_FORMATTERS,
		// },
		// setDisplayConfigs: (_displayConfigs: DisplayConfigs) =>
		// 	set((prev) => {
		// 		let next = clone(prev);
		// 		next.displayConfigs = _displayConfigs;
		// 		return next;
		// 	}),
	}))
);
