import { isNil } from 'ramda';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorIcon } from '../../../assets/icons/ErrorIcon';

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
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const error = errors[name];
	const [text, setText] = useState<string>('');

	const hasLabel: boolean = !isNil(label);

	return (
		<div className='flex flex-row items-center gap-2'>
			{hasLabel && (
				<p className='w-40 whitespace-normal break-words text-body text-neutral-gray-9'>
					{label}
				</p>
			)}
			<textarea
				rows={rows ?? 3}
				className={
					' resize-none rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none ' +
					` ${width === 'full' ? 'flex-1' : 'w-input-medium'} ` +
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
