export interface Applicant {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: Date;
	Address?: string;
	Phone: string;
	Email?: string;
	ExperienceYears?: number;
	AppliedPosition: string;
	AppliedDate: Date;
	AskingSalary: number;
}

// NOTE: This changes together with Applicant
export const APPLICANT_COLUMNS = [
	'NationalId',
	'FullName',
	'Gender',
	'BirthDate',
	'Address',
	'Phone',
	'Email',
	'ExperienceYears',
	'AppliedPosition',
	'AppliedDate',
	'AskingSalary',
];
