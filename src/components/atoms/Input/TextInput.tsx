import { isNil } from 'ramda';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface TextInputProps extends React.ComponentPropsWithRef<'input'> {
	name: string;
	label?: string;
	width: 'full' | 'medium';

	// validation rules
	rules?: {
		min?: number;
		max?: number;
		required?: boolean;
		regex?: string;
	};
}

export const TextInput = ({
	name,
	label,
	width,
	rules,
	type,
	placeholder,
	...props
}: TextInputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const [text, setText] = useState<string>('');

	const hasLabel: boolean = !isNil(label);
	const isNumber: boolean = type === 'number';

	function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
		setText(e.target.value);
	}

	// function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
	// 	if (!isNumber) {
	// 		return;
	// 	}

	//   if (e.k)
	// }

	return (
		<div className='flex flex-row gap-1 '>
			{hasLabel && (
				<p className='w-36 text-body text-neutral-gray-9'>{label}</p>
			)}
			<input
				type='text'
				className={
					' rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none ' +
					` ${errors[name] ? 'border-state-error' : 'border-primary-normal'} ` +
					' hover:shadow focus:shadow ' +
					' invalid:border-state-error ' +
					` ${width === 'full' ? 'w-full' : 'w-input-medium'} `
				}
				// onKeyDown={()}
				// value={text}
				// onChange={handleChangeText}
				{...props}
				{...register(name)}
			/>
			<div className='border border-red-600'>
				{`Errors: ${errors[name]?.message}`}
			</div>
		</div>
	);
};
