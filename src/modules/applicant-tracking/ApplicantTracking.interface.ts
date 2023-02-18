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
