import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/atoms/Button/Button';
import { TextInput } from '../../components/atoms/Input/TextInput';
import { Tag } from '../../components/atoms/Tag/Tag';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WarningIcon } from '../../assets/icons/WarningIcon';
import { SuccessIcon } from '../../assets/icons/SuccessIcon';
import { ErrorIcon } from '../../assets/icons/ErrorIcon';
import { TextAreaInput } from '../../components/atoms/Input/TextAreaInput';

interface FormValues {
	field1: string;
}

export const ExampleForm = () => {
	const schema = z.object({
		fullName: z
			.string()
			.min(2)
			.max(10, { message: 'Không được dài hơn 5 kí tự' }),
		bio: z.string().min(10),
		age: z.number().gte(18, { message: 'Không được dưới 18t' }),
	});

	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			field1: '',
		},
	});

	function handleSubmit(data: any) {
		console.log(data);
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(handleSubmit)}
				className='flex w-full flex-col gap-14 pt-20'
			>
				<p>Example 2</p>
				<div className='flex flex-col gap-2'>
					<TextInput label='Họ Tên' name='fullName' width='medium' />
					<TextAreaInput label='Bio' name='bio' width='medium' rows={5} />
					<TextInput label='Tuổi' type='number' name='age' width='medium' />
					<SuccessIcon size={24} />
					<WarningIcon size={24} />
					<ErrorIcon size={24} />
				</div>
				<Button
					width='small'
					onClick={() => {
						console.log(methods.formState.errors);
					}}
				>
					Submit
				</Button>
			</form>
		</FormProvider>
	);
};
