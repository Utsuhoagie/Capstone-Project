import ReactDatePicker from 'react-datepicker';
import './DateInput.css';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorIcon } from '../../../../assets/icons/ErrorIcon';
import { Label } from '../Label';
import { DisplayConfigs, getLabelForField } from '../../../../app/App.display';
import { CalendarIcon } from '../../../../assets/icons/CalendarIcon';
import dayjs from 'dayjs';

interface TimeInputProps {
	disabled?: boolean;
	name: string;
	isClearable?: boolean;
	label?: string;
	required?: boolean;
	placeholder?: string;
	width: 'medium' | 'full';
	displayConfigs: DisplayConfigs;
}

export const TimeInput = ({
	disabled,
	name,
	isClearable,
	label,
	required,
	placeholder,
	width,
	displayConfigs,
}: TimeInputProps) => {
	const { formState, setValue, getValues } = useFormContext();
	const error = formState.errors[name];

	// const hasLabel: boolean = label !== undefined;

	return (
		<div className='flex flex-row items-center gap-2'>
			<Label
				label={
					label ??
					getLabelForField({
						labellers: displayConfigs.labellers,
						field: name,
					})
				}
				required={required}
			/>

			<Controller
				name={name}
				render={({ field, fieldState, formState }) => {
					return (
						<div className='relative'>
							<ReactDatePicker
								disabled={disabled}
								className={
									' h-h-input rounded border bg-neutral-white px-2 py-1.5 text-neutral-gray-9 outline-none' +
									' hover:shadow focus:shadow ' +
									' disabled:cursor-not-allowed disabled:bg-neutral-gray-3 disabled:opacity-75 ' +
									` ${width === 'full' ? 'w-full' : 'w-w-input-medium'} ` +
									` ${
										error
											? 'border-state-error-normal'
											: 'border-primary-normal'
									} `
								}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={60}
								minDate={dayjs().startOf('day').toDate()}
								maxDate={dayjs().endOf('day').toDate()}
								isClearable={isClearable}
								placeholderText={placeholder}
								timeFormat='H:mm'
								dateFormat='H:mm'
								selected={(() => {
									const formValue =
										field.value === '' ? undefined : field.value;
									const formValueDayjs = dayjs(formValue);

									return formValue === undefined
										? undefined
										: formValueDayjs.toDate();
								})()}
								onChange={(date, event) => {
									console.log('onChange', date);
									if (date === null) {
										field.onChange(undefined, event);
										setValue(name, '');
										console.log('getValues', getValues());
										return;
									}

									const isoString = dayjs(date).toISOString();
									field.onChange(isoString, event);
								}}
								ref={(element) => element && field.ref(element['input'])}
							/>

							<CalendarIcon
								className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2'
								size={24}
							/>
						</div>
					);
				}}
			/>

			{error && (
				<div className='flex flex-row items-center gap-2 text-state-error-normal'>
					<ErrorIcon size={24} />
					<p>{error?.message?.toString()}</p>
				</div>
			)}
		</div>
	);
};
