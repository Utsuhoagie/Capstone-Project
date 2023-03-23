import { z } from 'zod';

export interface UpdatePositionFormIntermediateValues {
	Name: string;
}

export const updatePositionFormSchema = z.object({
	Name: z.string(),
});
