import dayjs from 'dayjs';

export enum RequestStatus {
	Pending = 0,
	Accepted = 1,
	Rejected = -1,
}

export type RequestType = 'Raise' | 'Leave' | 'Other';

export interface Request {
	Id: number;
	Title: string;
	Description: string;
	CreatedDate: Date;
	Type: RequestType;
	RequestStatus: RequestStatus;

	NewSalary?: number;
	StartLeaveDate?: Date;
	EndLeaveDate?: Date;

	EmployeeFullName: string;
}

export interface UpdateRequestStatusRequest {
	Id: number;
	RequestStatus: RequestStatus;
}

export interface Request_API_Response {
	Id: number;
	Title: string;
	Description: string;
	CreatedDate: string;
	Type: RequestType;
	RequestStatus: RequestStatus;

	NewSalary: number | null;
	StartLeaveDate: string | null;
	EndLeaveDate: string | null;

	EmployeeFullName: string;
}

export function mapToRequest(res: Request_API_Response): Request {
	return {
		...res,
		CreatedDate: dayjs(res.CreatedDate).toDate(),
		NewSalary: res.NewSalary ? res.NewSalary : undefined,
		StartLeaveDate: res.StartLeaveDate
			? dayjs(res.StartLeaveDate).toDate()
			: undefined,
		EndLeaveDate: res.EndLeaveDate
			? dayjs(res.EndLeaveDate).toDate()
			: undefined,
	};
}
