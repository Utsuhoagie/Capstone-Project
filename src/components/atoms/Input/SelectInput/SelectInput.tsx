import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '../Label';
import { DropdownIcon } from '../../../../assets/icons/DropdownIcon';
import { CheckboxIcon } from '../../../../assets/icons/CheckboxIcon';
import {
	DisplayConfigs,
	getDisplayForFieldValue,
	getLabelForField,
} from '../../../../app/App.display';
import { useApplicantStore } from '../../../../modules/applicant/Applicant.store';
import {
	SelectInputMultipleProps,
	SelectInputProps,
	SelectInputSingleProps,
} from './SelectInput.interface';
import { ErrorIcon } from '../../../../assets/icons/ErrorIcon';

/**
 * ======= NOTE:NOTE:NOTE:NOTE:NOTE:NOTE: =======
 * REMEMBER THERE ARE STYLES FOR MULTIPLE OR SINGLE SELECTINPUT
 * ======= NOTE:NOTE:NOTE:NOTE:NOTE:NOTE: =======
 */

export const SelectInput = ({
	// name,
	// options,
	// label,
	// multiple,
	// placeholder,
	// required,
	// ...props
	...props
}: SelectInputProps) => {
	const { watch, formState } = useFormContext();
	const error = formState.errors[props.name];

	// Can be multiple; different vars used based on `multiple`
	const selectedValue = watch(props.name) as string;
	const selectedValues = watch(props.name) as string[];

	/* 	const displayConfigs = useApplicantStore((state) => state.displayConfigs);

	const optionPairs = props.optionPairs.map((option) => ({
		value: option,
		display: getDisplayForFieldValue({
			displayConfigs,
			field: props.name,
			value: option,
		}),
	})); */

	return (
		<div className='flex w-full flex-row gap-2'>
			{props.multiple ? (
				<SelectInputMultiple
					selectedValues={selectedValues}
					hasError={Boolean(error)}
					{...props}
				/>
			) : (
				<SelectInputSingle
					selectedValue={selectedValue}
					hasError={Boolean(error)}
					{...props}
				/>
			)}

			{error && (
				<div className='flex flex-row items-center gap-2 text-state-error-normal'>
					<ErrorIcon size={24} />
					<p>{error?.message?.toString()}</p>
				</div>
			)}
		</div>
	);
};

const SelectInputSingle = ({
	name,
	hasError,
	optionPairs,
	width,
	displayConfigs,
	selectedValue,
	multiple,
	placeholder,
	required,
	disabled,
	...props
}: SelectInputSingleProps) => {
	// console.log({
	// 	displayConfigs,
	// 	field: name,
	// 	value: selectedValue,
	// });

	return (
		<Controller
			name={name}
			// defaultValue={options[0].value}
			render={({ field, fieldState, formState }) => (
				<Listbox
					disabled={disabled}
					as='div'
					className='flex flex-row items-center gap-2'
					value={field.value}
					onChange={field.onChange}
				>
					<Listbox.Label className='block'>
						<Label
							label={getLabelForField({
								labellers: displayConfigs.labellers,
								field: name,
							})}
							required={required}
						/>
					</Listbox.Label>

					<div className='flex flex-col'>
						<Listbox.Button
							className={
								' flex h-h-input flex-row justify-between border bg-neutral-white px-2 py-1.5 text-left text-neutral-gray-9 outline-none ' +
								` ${width === 'full' ? 'w-full' : 'w-w-input-medium'} ` +
								` ${
									hasError
										? 'border-state-error-normal'
										: 'border-primary-normal'
								} ` +
								' ui-open:rounded-t ui-not-open:rounded ' +
								' disabled:cursor-not-allowed disabled:bg-neutral-gray-3 disabled:opacity-75 '
							}
							disabled={disabled}
						>
							<p
								className={`overflow-ellipsis ${
									selectedValue !== '' ? '' : 'text-neutral-gray-5'
								}`}
							>
								{selectedValue !== ''
									? getDisplayForFieldValue({
											displayConfigs,
											field: name,
											value: selectedValue,
									  })
									: placeholder}
							</p>
							<DropdownIcon
								size={24}
								direction='down'
								className='ui-open:rotate-180'
							/>
						</Listbox.Button>

						<div className='relative'>
							<Listbox.Options className='absolute z-50 box-border w-w-input-medium divide-y divide-neutral-gray-4 overflow-hidden rounded-b border-x border-b border-primary-normal'>
								{optionPairs.map((optionPair) => (
									<Listbox.Option
										key={optionPair.value}
										value={optionPair.value}
										className={
											' h-h-input w-w-input-medium cursor-pointer bg-neutral-white px-2 py-1.5 text-neutral-gray-9 ' +
											' hover:bg-secondary-normal ui-selected:bg-secondary-normal '
										}
									>
										{optionPair.display}
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

const SelectInputMultiple = ({
	name,
	hasError,
	optionPairs,
	width,
	displayConfigs,
	selectedValues,
	multiple,
	placeholder,
	required,
	disabled,
	...props
}: SelectInputMultipleProps) => {
	return (
		<Controller
			name={name}
			defaultValue={[]}
			render={({ field, fieldState, formState }) => (
				<Listbox
					disabled={disabled}
					as='div'
					className='flex flex-row items-center gap-2'
					multiple
					value={field.value}
					onChange={field.onChange}
				>
					<Listbox.Label className='block'>
						<Label
							label={getLabelForField({
								labellers: displayConfigs.labellers,
								field: name,
							})}
							required={required}
						/>
					</Listbox.Label>

					<div className='flex flex-col'>
						<Listbox.Button
							className={
								' flex h-h-input w-w-input-medium flex-row justify-between border bg-neutral-white px-2 py-1.5 text-left text-neutral-gray-9 outline-none ' +
								` ${
									hasError
										? 'border-state-error-normal'
										: 'border-primary-normal'
								} ` +
								' ui-open:rounded-t ui-not-open:rounded ' +
								' disabled:cursor-not-allowed disabled:bg-neutral-gray-3 disabled:opacity-75 '
							}
						>
							<p className='overflow-ellipsis'>
								{selectedValues.length > 0
									? // ? selectedValues.join(', ')
									  'Nhiều...'
									: placeholder}
							</p>
							<DropdownIcon
								size={24}
								direction='down'
								className='ui-open:rotate-180'
							/>
						</Listbox.Button>

						<div className='relative'>
							<Listbox.Options className='absolute z-50 box-border w-w-input-medium divide-y divide-neutral-gray-4 overflow-hidden rounded-b border-x border-b border-primary-normal'>
								{optionPairs.map((optionPair) => (
									<Listbox.Option
										key={optionPair.value}
										value={optionPair.value}
										className={
											' z-50 flex h-h-input w-w-input-medium cursor-pointer flex-row items-center gap-2 bg-neutral-white px-2 py-1.5 text-neutral-gray-9 ' +
											' hover:bg-secondary-normal ui-selected:bg-secondary-normal '
										}
									>
										<CheckboxIcon
											checked={selectedValues.includes(optionPair.value)}
											size={24}
										/>
										<p>{optionPair.display}</p>
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
