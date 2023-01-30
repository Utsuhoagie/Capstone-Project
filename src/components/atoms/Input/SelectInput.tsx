import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from './Label';
import { DropdownIcon } from '../../../assets/icons/DropdownIcon';

interface SelectInputProps extends React.ComponentPropsWithRef<'select'> {
	name: string;
	options: string[];
	label?: string;
}

export const SelectInput = ({ name, options, label }: SelectInputProps) => {
	const { register, watch } = useFormContext();
	// const [selectedOption, setSelectedOption] = useState<string>(options[0]);
	const selectedOption = watch(name);

	return (
		<Controller
			name={name}
			defaultValue={options[0]}
			render={({ field, fieldState, formState }) => (
				<Listbox
					as='div'
					className='flex w-full flex-row items-center gap-2'
					value={field.value}
					onChange={field.onChange}
				>
					<Listbox.Label className='block'>
						<Label label={label} />
					</Listbox.Label>

					<div className='flex flex-col'>
						<Listbox.Button className='flex h-input-single w-input-medium flex-row justify-between border border-primary-normal bg-neutral-white px-2 py-1.5 text-left text-neutral-gray-9 outline-none ui-open:rounded-t ui-not-open:rounded'>
							{selectedOption}
							<DropdownIcon size={24} className='ui-open:rotate-180' />
						</Listbox.Button>

						<div className='relative'>
							<Listbox.Options className='absolute box-border w-input-medium divide-y divide-neutral-gray-4 overflow-hidden rounded-b border-x border-b border-primary-normal'>
								{options.map((option) => (
									<Listbox.Option
										key={option}
										value={option}
										className={
											' h-input-single w-input-medium cursor-pointer bg-neutral-white px-2 py-1.5 text-neutral-gray-9 ' +
											' hover:bg-primary-bright-4 ui-selected:bg-primary-bright-2 '
										}
									>
										{`${option}`}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</div>
					</div>
				</Listbox>
			)}
		/>
	);
};
