import dayjs from 'dayjs';

export interface Feedback {
	Title: string;
	Description: string;
	CreatedDate: Date;
	EmployeeFullName: string;
}

export interface Feedback_API_Response {
	Title: string;
	Description: string;
	CreatedDate: string;
	EmployeeFullName: string;
}

export function mapToFeedback(res: Feedback_API_Response): Feedback {
	return { ...res, CreatedDate: dayjs(res.CreatedDate).toDate() };
}
