import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '../../components/atoms/Button/Button';
import { TextInput } from '../../components/atoms/Input/TextInput';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { WarningIcon } from '../../assets/icons/WarningIcon';
import { SuccessIcon } from '../../assets/icons/SuccessIcon';
import { ErrorIcon } from '../../assets/icons/ErrorIcon';
import { TextAreaInput } from '../../components/atoms/Input/TextAreaInput';
import { SelectInput } from '../../components/atoms/Input/SelectInput/SelectInput';
import { isNil } from 'ramda';
import { CheckboxIcon } from '../../assets/icons/CheckboxIcon';
import { RadioGroupInput } from '../../components/atoms/Input/RadioGroupInput';

interface PresubmitFormValues {
	fullName: string;
	bio: string;
	age: string;
	sex: '' | 'male' | 'female' | 'other' | 'non';
	skills: ('react' | 'asp' | 'godot')[];
	level: 'junior' | 'senior' | 'lead';
}

export const ExampleForm = () => {
	const SEXES = ['male', 'female', 'other', 'non'];
	const SKILLS = ['react', 'asp', 'godot'];

	const schema = z.object({
		fullName: z
			.string()
			.min(2)
			.max(10, { message: 'Không được dài hơn 5 kí tự' }),
		// bio: z.union([z.literal(''), z.string().min(10)]),
		bio: z.preprocess(
			(val) => (val === '' ? undefined : val),
			z.string().min(10).optional()
		),
		age: z.coerce.number().int().gte(0, { message: 'Không được dưới 0t' }),
		sex: z.preprocess(
			(val) => (val === '' ? undefined : val),
			z.string().optional()
		),
		skills: z
			.union([z.literal('react'), z.literal('asp'), z.literal('godot')])
			.array(),
		level: z.preprocess(
			(val) => (val === '' ? undefined : val),
			z.string().optional()
		),
		// sex: z.string().refine(
		// 	(val) => {
		// 		const SMALL_SEXES = SEXES.slice(0, -1);
		// 		const isValid = SMALL_SEXES.includes(val);

		// 		if (!isValid)
		// 			methods.setError(
		// 				'sex',
		// 				{ type: 'not_in_array', message: 'Type is not in array (RHF)' },
		// 				{ shouldFocus: true }
		// 			);

		// 		return isValid;
		// 	},
		// 	{
		// 		message: 'Type is not in array (Zod)',
		// 	}
		// ),
		// sex: z.union([z.literal('male'), z.literal('female')]),
		// sex: z.union(sexes.map((sex) => z.literal(sex.type))),
	});

	const methods = useForm<PresubmitFormValues>({
		resolver: zodResolver(schema),
		mode: 'onSubmit',
		defaultValues: {
			fullName: '',
			bio: '',
			age: '',
			sex: '',
			skills: [],
			level: 'junior',
		},
	});

	console.log(
		methods.getValues()
		// formErrors: methods.formState.errors,
	);

	function handleSubmit(data: any) {
		console.log({ submitData: data });
	}

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(handleSubmit)}
				className='flex w-full flex-col gap-14 pt-20'
			>
				<p>Example 2</p>
				<div className='flex flex-col gap-2'>
					<TextInput name='fullName' label='Họ Tên' width='medium' required />
					<TextInput name='age' label='Tuổi' width='medium' />
					<TextAreaInput name='bio' label='Bio' width='medium' rows={5} />

					<SelectInput
						name='sex'
						placeholder='Hãy chọn 1...'
						label='Giới tính'
						optionPairs={SEXES}
					/>
					<SelectInput
						name='skills'
						placeholder='Hãy chọn nhiều...'
						label='Kĩ năng'
						multiple
						optionPairs={SKILLS}
					/>
					<RadioGroupInput
						name='level'
						label='Trình độ'
						direction='horizontal'
						options={['junior', 'senior', 'lead']}
					/>

					<p>Icons</p>
					<SuccessIcon size={24} />
					<WarningIcon size={24} />
					<ErrorIcon size={24} />
					<CheckboxIcon size={24} />
					<CheckboxIcon checked size={24} />
				</div>
				<Button
					width='small'
					onClick={(e) => {
						console.log({
							data: methods.getValues(),
							errors: methods.formState.errors,
						});
					}}
				>
					Submit
				</Button>
				<Button width='full' variant='secondary' type='button'>
					Secondary
				</Button>
			</form>
		</FormProvider>
	);
};
