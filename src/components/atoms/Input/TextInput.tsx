import { isNil } from 'ramda';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorIcon } from '../../../assets/icons/ErrorIcon';
import { Label } from './Label';

interface TextInputProps extends React.ComponentPropsWithRef<'input'> {
	name: string;
	label?: string;
	width: 'full' | 'medium';
}

export const TextInput = ({
	name,
	label,
	width,
	type,
	required,
	...props
}: TextInputProps) => {
	const { register, formState } = useFormContext();
	const error = formState.errors[name];
	const [text, setText] = useState<string>('');

	const hasLabel: boolean = !isNil(label);
	const isNumber: boolean = type === 'number';

	return (
		<div className='flex flex-row items-center gap-2'>
			{hasLabel && <Label label={label} required={required} />}
			<input
				className={
					' h-h-input rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none ' +
					` ${error ? 'border-state-error' : 'border-primary-normal'} ` +
					' hover:shadow focus:shadow ' +
					` ${width === 'full' ? 'w-full' : 'w-w-input-medium'} `
				}
				{...props}
				{...register(name, { valueAsNumber: isNumber })}
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
