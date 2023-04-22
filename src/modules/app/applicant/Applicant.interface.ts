import dayjs from 'dayjs';

export interface Applicant {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: Date;
	Address: string;
	Phone: string;
	Email: string;
	ExperienceYears: number;
	AppliedPositionName: string;
	AppliedDate: Date;
	AskingSalary: number;
	ImageFileName?: string;
}

export interface Applicant_API_Request {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: Date;
	Address: string;
	Phone: string;
	Email: string;
	ExperienceYears: number;
	AppliedPositionName: string;
	AppliedDate: Date;
	AskingSalary: number;
	Image?: File;
}

export interface Applicant_API_Response {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate: string | null;
	Address: string;
	Phone: string;
	Email: string;
	ExperienceYears: number;
	AppliedPositionName: string;
	AppliedDate: string;
	AskingSalary: number;
	ImageFileName: string | null;
}

export function mapToApplicant(res: Applicant_API_Response): Applicant {
	return {
		...res,
		BirthDate: res.BirthDate ? dayjs(res.BirthDate).toDate() : undefined,
		AppliedDate: dayjs(res.AppliedDate).toDate(),
		ImageFileName: res.ImageFileName ? res.ImageFileName : undefined,
	};
}
