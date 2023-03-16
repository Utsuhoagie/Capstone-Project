export interface Applicant {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: Date;
	Address: string;
	Phone: string;
	Email?: string;
	ExperienceYears: number;
	AppliedPositionName: string;
	AppliedDate: Date;
	AskingSalary: number;
}

export interface Applicant_API_Response {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate: string | null;
	Address: string;
	Phone: string;
	Email: string | null;
	ExperienceYears: number;
	AppliedPositionName: string;
	AppliedDate: string;
	AskingSalary: number;
}
