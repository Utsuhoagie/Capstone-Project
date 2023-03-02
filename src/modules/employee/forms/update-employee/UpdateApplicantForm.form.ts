import dayjs from 'dayjs';
import { z } from 'zod';

export interface UpdateEmployeeFormIntermediateValues {
	NationalId: string;
	FullName: string;
	Gender: 'male' | 'female' | 'other';
	BirthDate?: Date;
	Address: string;
	Phone: string;
	Email?: string;
	ExperienceYears: string;
	Position: string;
	Salary: number;
}

export const updateEmployeeFormSchema = z.object({
	NationalId: z.string().regex(/^(\d){9}((\d){3})?$/, {
		message: 'Số CMND/CCCD phải có đúng 9 hoặc 12 số.',
	}),

	FullName: z
		.string()
		.min(5, { message: 'Họ tên phải dài hơn 5 kí tự.' })
		.max(50, { message: 'Họ tên phải ngắn hơn 50 kí tự.' }),

	Gender: z.union([z.literal('male'), z.literal('female'), z.literal('other')]),

	BirthDate: z
		.date()
		.min(dayjs().subtract(55, 'year').toDate(), { message: 'Tối đa 55 tuổi.' })
		.max(dayjs().subtract(18, 'year').toDate(), {
			message: 'Tối thiểu 18 tuổi.',
		})
		.optional(),

	Address: z
		.string()
		.min(5, { message: 'Địa chỉ quá ngắn.' })
		.max(200, { message: 'Địa chỉ quá dài.' }),

	Phone: z
		.string()
		.regex(/^\d{10,11}$/, { message: 'Số điện thoại phải có 10 hoặc 11 số.' }),

	Email: z.preprocess(
		(val) => (val === '' ? undefined : val),
		z.string().email({ message: 'Email không hợp lệ.' }).optional()
	),

	// ExperienceYears: z.coerce
	// 	.number({ invalid_type_error: 'Số năm kinh nghiệm phải là số nguyên.' })
	// 	.int({ message: 'Số năm kinh nghiệm phải là số nguyên.' })
	// 	.nonnegative({ message: 'Số năm kinh nghiệm ít nhất là 0.' }),
	// ExperienceYears: z.string().regex(/^[0-47]$/, { message: 'Số năm kinh nghiệm'}),
	ExperienceYears: z.custom(
		(val) => {
			const _val = val as string;
			const isValidInt = !!_val.match(/^\d{1,2}$/);

			if (!isValidInt) return false;

			const int = Number(_val);
			const isExperienceValid = int >= 0 && int <= 37;

			return isExperienceValid;
		},
		{ message: 'Số năm kinh nghiệm không hợp lệ.' }
	),

	AppliedPosition: z
		.string()
		.min(2, { message: 'Vị trí không hợp lệ.' })
		.max(30, { message: 'Vị trí không hợp lệ.' }),

	// AppliedDate: z.coerce
	// 	.date({ invalid_type_error: 'Not a real date' })
	// 	.max(dayjs().toDate(), { message: 'Thời điểm nộp hồ sơ không hợp lệ.' }),
	AppliedDate: z.preprocess(
		(val) => dayjs(val as string).toDate(),
		z.date().max(dayjs().add(1, 'hour').toDate(), {
			message: 'Thời điểm nộp hồ sơ không hợp lệ.',
		})
	),

	// AskingSalary: z.coerce
	// 	.number({ invalid_type_error: 'Mức lương đề nghị phải là số nguyên.' })
	// 	.int({ message: 'Mức lương đề nghị phải là số nguyên.' })
	// 	.positive({ message: 'Mức lương đề nghị phải lớn hơn 0.' }),
	// AskingSalary: z.string().regex(/^\d{1,10}$/, {
	// 	message: 'Mức lương đề nghị phải là số nguyên lớn hơn 0.',
	// }),
	AskingSalary: z.custom(
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
	),
});
