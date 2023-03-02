export interface Employee {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: Date;
	Address: string;
	Phone: string;
	Email?: string;
	ExperienceYears: number;
	Position: string;
	Salary: number;
	EmployedDate: Date;
	StartHour: number;
	EndHour: number;
}

export interface Employee_APIResponse {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate: string | null;
	Address: string;
	Phone: string;
	Email: string | null;
	ExperienceYears: number;
	Position: string;
	Salary: number;
	EmployedDate: string;
	StartHour: number;
	EndHour: number;
}
