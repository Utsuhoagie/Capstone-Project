export interface Applicant {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: Date;
	Address: string;
	Phone: string;
	Email?: string;
	ExperienceYears: number;
	AppliedPosition: string;
	AppliedDate: Date;
	AskingSalary: number;
}

export interface Applicant_APIResponse {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate: Date | null;
	Address: string;
	Phone: string;
	Email: string | null;
	ExperienceYears: number;
	AppliedPosition: string;
	AppliedDate: Date;
	AskingSalary: number;
}
