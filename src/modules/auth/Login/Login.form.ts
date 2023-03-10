import { z } from 'zod';

export interface LoginModel {
	Email: string;
	Password: string;
}

export interface LoginFormIntermediateValues {
	Email: string;
	Password: string;
}

export const loginFormSchema = z.object({
	Email: z.string().email(),

	Password: z.string(),
});
