export interface Position {
	Name: string;
	ApplicantCount: number;
	EmployeeCount: number;
}

export interface Position_API_Response {
	Name: string;
	ApplicantCount: number;
	EmployeeCount: number;
}

export function mapToPosition(res: Position_API_Response): Position {
	return { ...res };
}
