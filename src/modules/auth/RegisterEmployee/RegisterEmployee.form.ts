import { z } from 'zod';

export interface RegisterEmployeeModel {
	Email: string;
	Password: string;
	PasswordConfirm: string;
}

export interface RegisterEmployeeFormIntermediateValues {
	Email: string;
	Password: string;
	PasswordConfirm: string;
}

export const registerEmployeeFormSchema = z
	.object({
		Email: z.string().email(),

		Password: z
			.string()
			.min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự.' }),

		PasswordConfirm: z
			.string()
			.min(8, { message: 'Mật khẩu phải có ít nhất 8 kí tự.' }),
	})
	.refine((schema) => schema.PasswordConfirm === schema.Password, {
		path: ['PasswordConfirm'],
		message: 'Mật khẩu không trùng khớp.',
	});
