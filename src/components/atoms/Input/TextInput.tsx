import { isNil } from 'ramda';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorIcon } from '../../../assets/icons/ErrorIcon';

interface TextInputProps extends React.ComponentPropsWithRef<'input'> {
	name: string;
	label?: string;
	width: 'full' | 'medium';
}

export const TextInput = ({ name, label, width, ...props }: TextInputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const error = errors[name];
	const [text, setText] = useState<string>('');

	const hasLabel: boolean = !isNil(label);

	return (
		<div className='flex flex-row gap-2'>
			{hasLabel && (
				<p className='w-36 text-body text-neutral-gray-9'>{label}</p>
			)}
			<input
				type='text'
				className={
					' h-10 rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none ' +
					` ${error ? 'border-state-error' : 'border-primary-normal'} ` +
					' hover:shadow focus:shadow ' +
					` ${width === 'full' ? 'w-full' : 'w-input-medium'} `
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
