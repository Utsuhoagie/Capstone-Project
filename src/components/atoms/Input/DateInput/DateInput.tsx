import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import './DateInput.css';
import { useFormContext } from 'react-hook-form';
import { ErrorIcon } from '../../../../assets/icons/ErrorIcon';
import { Label } from '../Label';

interface DateInputProps {
	name: string;
	label?: string;
	required?: boolean;
	width: 'medium' | 'full';
}

export const DateInput = ({ name, label, width, required }: DateInputProps) => {
	const { register, formState } = useFormContext();

	const [date, setDate] = useState(new Date());

	const error = formState.errors[name];

	const hasLabel: boolean = label !== undefined;

	return (
		<div className='flex flex-row items-center gap-0'>
			{hasLabel && <Label label={label} required={required} />}
			{/* <input
				className={
					' h-h-input rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none ' +
					` ${error ? 'border-state-error' : 'border-primary-normal'} ` +
					' hover:shadow focus:shadow ' +
					` ${width === 'full' ? 'w-full' : 'w-w-input-medium'} `
				}
				{...register(name, { valueAsDate: true })}
			/> */}
			<ReactDatePicker
				selected={date}
				onChange={(date) => setDate(date ?? new Date())}
				className={
					' mx-2 h-h-input rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none' +
					` ${error ? 'border-state-error' : 'border-primary-normal'} ` +
					' hover:shadow focus:shadow ' +
					` ${width === 'full' ? 'w-full' : 'w-w-input-medium'} `
				}
			/>

			{error && (
				<div className='flex flex-row items-center gap-2 text-state-error'>
					<ErrorIcon size={24} />
					<p>{error?.message?.toString()}</p>
				</div>
			)}
		</div>
	);
};
