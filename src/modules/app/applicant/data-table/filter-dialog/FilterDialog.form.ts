import dayjs from 'dayjs';
import { z } from 'zod';
import {
	isIntValid,
	preprocessStringToOptionalDate,
	preprocessStringToOptionalString,
} from '../../../../../app/App.form';

export interface FilterApplicantFormIntermediateValues {
	NamePart: string;
	Gender: 'male' | 'female' | 'other' | '';
	Address: string;
	AppliedPositionName: string;

	ExperienceYearsFrom: string;
	ExperienceYearsTo: string;

	AppliedDateFrom: string;
	AppliedDateTo: string;

	AskingSalaryFrom: string;
	AskingSalaryTo: string;
}

export interface FilterApplicantFormSubmitValues {
	NamePart?: string;
	Gender?: 'male' | 'female' | 'other';
	Address?: string;
	AppliedPositionName?: string;

	ExperienceYearsFrom?: number;
	ExperienceYearsTo?: number;

	AppliedDateFrom?: string;
	AppliedDateTo?: string;

	AskingSalaryFrom?: number;
	AskingSalaryTo?: number;
}

export const filterApplicantDialogFormSchema = z.object({
	NamePart: z.preprocess(
		preprocessStringToOptionalString,
		z.string().max(50, { message: 'Họ tên phải ngắn hơn 50 kí tự.' }).optional()
	),

	Gender: z.preprocess(
		preprocessStringToOptionalString,
		z
			.union([z.literal('male'), z.literal('female'), z.literal('other')])
			.optional()
	),

	Address: z.preprocess(
		preprocessStringToOptionalString,
		z.string().max(200, { message: 'Địa chỉ quá dài.' }).optional()
	),

	AppliedPositionName: z.preprocess(
		preprocessStringToOptionalString,
		z.string().max(30, { message: 'Vị trí không hợp lệ.' }).optional()
	),

	ExperienceYearsFrom: z.preprocess(
		preprocessStringToOptionalString,
		z
			.custom(
				(val) => {
					if (!isIntValid(val)) return false;

					const int = Number(val);
					const isExperienceValid = int >= 0 && int <= 37;

					return isExperienceValid;
				},
				{ message: 'Số năm kinh nghiệm không hợp lệ.' }
			)
			.optional()
	),
	ExperienceYearsTo: z.preprocess(
		preprocessStringToOptionalString,
		z
			.custom(
				(val) => {
					if (!isIntValid(val)) return false;

					const int = Number(val);
					const isExperienceValid = int >= 0 && int <= 37;

					return isExperienceValid;
				},
				{ message: 'Số năm kinh nghiệm không hợp lệ.' }
			)
			.optional()
	),

	AppliedDateFrom: z.preprocess(
		preprocessStringToOptionalDate,
		z
			.date()
			.max(dayjs().add(1, 'hour').toDate(), {
				message: 'Thời điểm nộp hồ sơ không hợp lệ.',
			})
			.optional()
	),
	AppliedDateTo: z.preprocess(
		preprocessStringToOptionalDate,
		z
			.date()
			.max(dayjs().add(1, 'hour').toDate(), {
				message: 'Thời điểm nộp hồ sơ không hợp lệ.',
			})
			.optional()
	),

	AskingSalaryFrom: z.preprocess(
		preprocessStringToOptionalString,
		z
			.custom(
				(val) => {
					if (!isIntValid(val)) return false;

					const int = Number(val);
					const isAskingSalaryValid = int >= 0 && int <= 999_000_000;
					return isAskingSalaryValid;
				},
				{
					message:
						'Mức lương đề nghị phải là số nguyên lớn hơn 0, nhỏ hơn 999 triệu.',
				}
			)
			.optional()
	),
	AskingSalaryTo: z.preprocess(
		preprocessStringToOptionalString,
		z
			.custom(
				(val) => {
					if (!isIntValid(val)) return false;

					const int = Number(val);
					const isAskingSalaryValid = int >= 0 && int <= 999_000_000;
					return isAskingSalaryValid;
				},
				{
					message:
						'Mức lương đề nghị phải là số nguyên lớn hơn 0, nhỏ hơn 999 triệu.',
				}
			)
			.optional()
	),
});
