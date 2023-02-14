import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';
import { Applicant } from './ApplicantTracking.interface';

interface ApplicantTrackingStore {
	// Server state
	applicants: Applicant[];
	setApplicants: (_applicants: Applicant[]) => void;

	// Client state
	selectedApplicant: Applicant | undefined;
	setSelectedApplicant: (_applicant: Applicant) => void;
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
		setSelectedApplicant: (_applicant: Applicant) =>
			set((prev) => {
				let next = clone(prev);
				next.selectedApplicant = _applicant;
				return next;
			}),
	}))
);
