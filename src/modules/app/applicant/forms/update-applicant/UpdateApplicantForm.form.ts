import dayjs from 'dayjs';
import { z } from 'zod';
import {
	isIntValid,
	preprocessFileListToFirstFile,
	preprocessStringToOptionalDate,
	preprocessStringToOptionalString,
} from '../../../../../app/App.form';

export interface UpdateApplicantFormIntermediateValues {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: string;
	Address: string;
	Phone: string;
	Email: string;
	ExperienceYears: string;
	AppliedPositionName: string;
	AppliedDate: string;
	AskingSalary: string;
	Image?: File;
}

export const updateApplicantFormSchema = z.object({
	NationalId: z.string().regex(/^(\d){9}((\d){3})?$/, {
		message: 'Số CMND/CCCD phải có đúng 9 hoặc 12 số.',
	}),

	FullName: z
		.string()
		.min(5, { message: 'Họ tên phải dài hơn 5 kí tự.' })
		.max(50, { message: 'Họ tên phải ngắn hơn 50 kí tự.' }),

	Gender: z.union([z.literal('male'), z.literal('female'), z.literal('other')]),

	BirthDate: z.preprocess(
		preprocessStringToOptionalDate,
		z
			.date()
			.min(dayjs().subtract(55, 'year').toDate(), {
				message: 'Tối đa 55 tuổi.',
			})
			.max(dayjs().subtract(18, 'year').toDate(), {
				message: 'Tối thiểu 18 tuổi.',
			})
			.optional()
	),

	Address: z
		.string()
		.min(5, { message: 'Địa chỉ quá ngắn.' })
		.max(200, { message: 'Địa chỉ quá dài.' }),

	Phone: z
		.string()
		.regex(/^\d{10,11}$/, { message: 'Số điện thoại phải có 10 hoặc 11 số.' }),

	Email: z.string().email({ message: 'Email không hợp lệ.' }),

	ExperienceYears: z.custom(
		(val) => {
			if (!isIntValid(val)) return false;

			const int = Number(val);
			const isExperienceValid = int >= 0 && int <= 37;

			return isExperienceValid;
		},
		{ message: 'Số năm kinh nghiệm không hợp lệ.' }
	),

	AppliedPositionName: z
		.string()
		.min(2, { message: 'Vị trí không hợp lệ.' })
		.max(30, { message: 'Vị trí không hợp lệ.' }),

	AppliedDate: z.preprocess(
		preprocessStringToOptionalDate,
		z.date().max(dayjs().add(1, 'hour').toDate(), {
			message: 'Thời điểm nộp hồ sơ không hợp lệ.',
		})
	),

	AskingSalary: z.custom(
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
	),

	Image: z.preprocess(
		preprocessFileListToFirstFile,
		z.custom((val) => {
			if (val instanceof File || val === undefined) {
				return true;
			}
			return false;
		})
	),
});
