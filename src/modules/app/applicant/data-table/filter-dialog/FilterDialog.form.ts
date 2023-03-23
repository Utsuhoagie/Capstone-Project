import dayjs from 'dayjs';
import { z } from 'zod';

export interface FilterApplicantFormIntermediateValues {
	// NationalId?: string;
	SubName: string;
	Gender: 'male' | 'female' | 'other' | '';
	// BirthDate: Date;
	Address: string;
	// Phone: string;
	// Email: string;
	ExperienceYears: string;
	AppliedPositionName: string;
	AppliedDateFrom: string;
	AppliedDateTo: string;

	AskingSalary: string;
}

export interface FilterApplicantFormSubmitValues {
	SubName?: string;
	Gender?: 'male' | 'female' | 'other';
	Address?: string;
	ExperienceYears?: number;
	AppliedPositionName?: string;
	AppliedDateFrom?: string;
	AppliedDateTo?: string;
	AskingSalary?: number;
}

export const filterApplicantDialogFormSchema = z.object({
	// NationalId: z.string().regex(/^(\d){9}((\d){3})?$/, {
	// 	message: 'Số CMND/CCCD phải có đúng 9 hoặc 12 số.',
	// }),

	SubName: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z.string().max(50, { message: 'Họ tên phải ngắn hơn 50 kí tự.' }).optional()
	),

	Gender: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z
			.union([z.literal('male'), z.literal('female'), z.literal('other')])
			.optional()
	),

	// BirthDate: z
	// 	.date()
	// 	.min(dayjs().subtract(55, 'year').toDate(), { message: 'Tối đa 55 tuổi.' })
	// 	.max(dayjs().subtract(18, 'year').toDate(), {
	// 		message: 'Tối thiểu 18 tuổi.',
	// 	})
	// 	.optional(),

	Address: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z.string().max(200, { message: 'Địa chỉ quá dài.' }).optional()
	),

	// Phone: z
	// 	.string()
	// 	.regex(/^\d{10,11}$/, { message: 'Số điện thoại phải có 10 hoặc 11 số.' }),

	// Email: z.preprocess(
	// 	(val) => (val === '' ? undefined : val),
	// 	z.string().email({ message: 'Email không hợp lệ.' }).optional()
	// ),

	ExperienceYears: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z
			.custom(
				(val) => {
					const _val = val as string;
					const isValidInt = !!_val.match(/^\d{1,2}$/);

					if (!isValidInt) return false;

					const int = Number(_val);
					const isExperienceValid = int >= 0 && int <= 37;

					return isExperienceValid;
				},
				{ message: 'Số năm kinh nghiệm không hợp lệ.' }
			)
			.optional()
	),

	AppliedPositionName: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z.string().max(30, { message: 'Vị trí không hợp lệ.' }).optional()
	),

	AppliedDateFrom: z.preprocess(
		(val) => (val === '' ? undefined : dayjs(val as string).toDate()),
		z
			.date()
			.max(dayjs().add(1, 'hour').toDate(), {
				message: 'Thời điểm nộp hồ sơ không hợp lệ.',
			})
			.optional()
	),
	AppliedDateTo: z.preprocess(
		(val) => (val === '' ? undefined : dayjs(val as string).toDate()),
		z
			.date()
			.max(dayjs().add(1, 'hour').toDate(), {
				message: 'Thời điểm nộp hồ sơ không hợp lệ.',
			})
			.optional()
	),

	AskingSalary: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z
			.custom(
				(val) => {
					const _val = val as string;
					const isValidInt = !!_val.match(/^\d{1,9}$/);

					if (!isValidInt) return false;

					const int = Number(_val);
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
