import { isNil } from 'ramda';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorIcon } from '../../../assets/icons/ErrorIcon';
import { Label } from './Label';

interface TextAreaInputProps extends React.ComponentPropsWithRef<'textarea'> {
	name: string;
	label?: string;
	width: 'full' | 'medium';
}

export const TextAreaInput = ({
	name,
	label,
	width,
	rows,
	cols,
	...props
}: TextAreaInputProps) => {
	const { register, formState } = useFormContext();
	const error = formState.errors[name];
	const hasLabel: boolean = !isNil(label);

	return (
		<div className='flex flex-row items-center gap-2'>
			{hasLabel && <Label label={label} />}
			<textarea
				rows={rows ?? 3}
				className={
					' resize-none rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none ' +
					` ${width === 'full' ? 'flex-1' : 'w-w-input-medium'} ` +
					` ${error ? 'border-state-error' : 'border-primary-normal'} ` +
					' hover:shadow focus:shadow '
				}
				{...props}
				{...register(name)}
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
