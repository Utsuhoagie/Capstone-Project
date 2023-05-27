import dayjs from 'dayjs';
import { z } from 'zod';
import {
	isIntValid,
	preprocessStringToOptionalDate,
	preprocessStringToOptionalString,
} from '../../../../../app/App.form';
import { RequestStatus, RequestType } from '../../Request.interface';

export interface FilterRequestFormIntermediateValues {
	Type: RequestType | '';
	RequestStatus: RequestStatus | '';
}

export interface FilterRequestFormSubmitValues {
	Type?: RequestType;
	RequestStatus?: RequestStatus;
}

export const filterRequestDialogFormSchema = z.object({
	Type: z.preprocess(
		preprocessStringToOptionalString,
		z
			.union([z.literal('Raise'), z.literal('Leave'), z.literal('Other')])
			.optional()
	),

	RequestStatus: z.preprocess(
		(val: unknown) => (val === '' ? undefined : val),
		z
			.union([
				z.literal(RequestStatus.Accepted),
				z.literal(RequestStatus.Pending),
				z.literal(RequestStatus.Rejected),
			])
			.optional()
	),
});
