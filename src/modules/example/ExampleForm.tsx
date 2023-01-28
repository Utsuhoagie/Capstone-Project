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

interface FormValues {
	field1: string;
}

export const ExampleForm = () => {
	const schema = z.object({
		field1: z.string().max(5).min(2),
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
				className='flex flex-col gap-14 pt-20'
			>
				<p>Example 2</p>
				<div>
					<TextInput name='field1' width='medium' />
					<SuccessIcon size={24} />
					<WarningIcon size={24} />
					<ErrorIcon size={24} />
				</div>
				{JSON.stringify(methods.formState.errors.field1?.message)}
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
