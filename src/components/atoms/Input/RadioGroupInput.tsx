import { RadioGroup } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { RadioIcon } from '../../../assets/icons/RadioIcon';
import { Label } from './Label';

interface RadioGroupInput extends React.ComponentPropsWithRef<'input'> {
	name: string;
	options: string[];
	label?: string;
	direction: 'vertical' | 'horizontal';
}

export const RadioGroupInput = ({
	name,
	options,
	label,
	direction,
	required,
	...props
}: RadioGroupInput) => {
	const { watch } = useFormContext();
	const selectedOption = watch(name) as string;
	const isVertical = direction === 'vertical';

	return (
		<Controller
			name={name}
			defaultValue={options[0]}
			render={({ field, fieldState, formState }) => (
				<RadioGroup
					className={`${
						isVertical ? 'h-fit' : 'h-h-input items-center'
					} flex flex-row gap-1`}
					value={field.value}
					onChange={field.onChange}
				>
					<RadioGroup.Label>
						<Label label={label} required={required} />
					</RadioGroup.Label>

					<div
						className={`flex ${
							direction === 'vertical' ? 'flex-col gap-1' : 'flex-row gap-2'
						}`}
					>
						{options.map((option) => (
							<RadioGroup.Option
								className={
									' flex h-h-input cursor-pointer flex-row items-center gap-1 pr-2 ' +
									' disabled:bg-neutral-gray-3 disabled:opacity-75 '
								}
								key={option}
								value={option}
							>
								<RadioIcon size={24} checked={selectedOption === option} />
								{option}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			)}
		/>
	);
};
