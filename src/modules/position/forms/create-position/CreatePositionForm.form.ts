import { z } from 'zod';

export interface CreatePositionFormIntermediateValues {
	Name: string;
}

export const createPositionFormSchema = z.object({
	Name: z.string(),
});
