import dayjs from 'dayjs';
import { z } from 'zod';

export interface CreateApplicantFormIntermediateValues {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: string;
	Address?: string;
	Phone: string;
	Email?: string;
	ExperienceYears: string;
	AppliedPosition: string;
	AppliedDate: string;
	AskingSalary: string;
}

export const createApplicantFormSchema = z.object({
	NationalId: z.string().regex(/^(\d){9}((\d){3})?$/, {
		message: 'Số CMND/CCCD phải có đúng 9 hoặc 12 số.',
	}),

	FullName: z
		.string()
		.min(5, { message: 'Họ tên phải dài hơn 5 kí tự.' })
		.max(50, { message: 'Họ tên phải ngắn hơn 50 kí tự.' }),

	Gender: z.union([z.literal('male'), z.literal('female'), z.literal('other')]),

	BirthDate: z.coerce
		.date()
		.min(dayjs().subtract(65, 'year').toDate(), { message: 'Tối đa 65 tuổi.' })
		.max(dayjs().subtract(18, 'year').toDate(), {
			message: 'Tối thiểu 18 tuổi.',
		})
		.optional(),

	Address: z.string().max(200, { message: 'Địa chỉ quá dài.' }),

	Phone: z
		.string()
		.regex(/^\d{10,11}$/, { message: 'Số điện thoại phải có 10 hoặc 11 số.' }),

	Email: z.string().email({ message: 'Email không hợp lệ.' }).optional(),

	ExperienceYears: z.coerce
		.number({ invalid_type_error: 'Số năm kinh nghiệm phải là số nguyên.' })
		.int({ message: 'Số năm kinh nghiệm phải là số nguyên.' })
		.nonnegative({ message: 'Số năm kinh nghiệm ít nhất là 0.' }),

	AppliedPosition: z
		.string()
		.min(2, { message: 'Vị trí không hợp lệ.' })
		.max(30, { message: 'Vị trí không hợp lệ.' }),

	// AppliedDate: z.coerce
	// 	.date({ invalid_type_error: 'Not a real date' })
	// 	.max(dayjs().toDate(), { message: 'Thời điểm nộp hồ sơ không hợp lệ.' }),
	AppliedDate: z.preprocess(
		(val) => dayjs(val as string),
		z
			.date()
			.max(dayjs().toDate(), { message: 'Thời điểm nộp hồ sơ không hợp lệ.' })
	),

	// AskingSalary: z.coerce
	// 	.number({ invalid_type_error: 'Mức lương đề nghị phải là số nguyên.' })
	// 	.int({ message: 'Mức lương đề nghị phải là số nguyên.' })
	// 	.positive({ message: 'Mức lương đề nghị phải lớn hơn 0.' }),
	AskingSalary: z.string().regex(/^\d{1,10}$/, {
		message: 'Mức lương đề nghị phải là số nguyên lớn hơn 0.',
	}),
});
