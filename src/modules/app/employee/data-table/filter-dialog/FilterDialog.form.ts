import dayjs from 'dayjs';
import { z } from 'zod';
import {
	isIntValid,
	preprocessStringToOptionalDate,
	preprocessStringToOptionalString,
} from '../../../../../app/App.form';

export interface FilterEmployeeFormIntermediateValues {
	NamePart: string;
	Gender: 'male' | 'female' | 'other' | '';
	Address: string;
	PositionName: string;

	ExperienceYearsFrom: string;
	ExperienceYearsTo: string;

	EmployedDateFrom: string;
	EmployedDateTo: string;

	SalaryFrom: string;
	SalaryTo: string;
}

export interface FilterEmployeeFormSubmitValues {
	NamePart?: string;
	Gender?: 'male' | 'female' | 'other';
	Address?: string;
	PositionName?: string;

	ExperienceYearsFrom?: number;
	ExperienceYearsTo?: number;

	EmployedDateFrom?: string;
	EmployedDateTo?: string;

	SalaryFrom?: number;
	SalaryTo?: number;
}

export const filterEmployeeDialogFormSchema = z.object({
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

	PositionName: z.preprocess(
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

	EmployedDateFrom: z.preprocess(
		preprocessStringToOptionalDate,
		z
			.date()
			.max(dayjs().add(1, 'hour').toDate(), {
				message: 'Ngày bắt đầu làm việc không hợp lệ.',
			})
			.optional()
	),
	EmployedDateTo: z.preprocess(
		preprocessStringToOptionalDate,
		z
			.date()
			.max(dayjs().add(1, 'hour').toDate(), {
				message: 'Ngày bắt đầu làm việc không hợp lệ.',
			})
			.optional()
	),

	SalaryFrom: z.preprocess(
		preprocessStringToOptionalString,
		z
			.custom(
				(val) => {
					if (!isIntValid(val)) return false;

					const int = Number(val);
					const isSalaryFromValid = int >= 0 && int <= 999_000_000;
					return isSalaryFromValid;
				},
				{
					message:
						'Mức lương đề nghị phải là số nguyên lớn hơn 0, nhỏ hơn 999 triệu.',
				}
			)
			.optional()
	),

	SalaryTo: z.preprocess(
		preprocessStringToOptionalString,
		z
			.custom(
				(val) => {
					if (!isIntValid(val)) return false;

					const int = Number(val);
					const isSalaryFromValid = int >= 0 && int <= 999_000_000;
					return isSalaryFromValid;
				},
				{
					message:
						'Mức lương đề nghị phải là số nguyên lớn hơn 0, nhỏ hơn 999 triệu.',
				}
			)
			.optional()
	),
});
