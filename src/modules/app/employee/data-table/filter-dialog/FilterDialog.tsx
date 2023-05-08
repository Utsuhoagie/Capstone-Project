import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import QueryString from 'query-string';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { addEmptySelectOption } from '../../../../../app/App.display';
import { useDialogStore } from '../../../../../app/App.store';
import { Button } from '../../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../../components/atoms/Input/DateTimeInput/DateInput';
import { SelectInput } from '../../../../../components/atoms/Input/SelectInput/SelectInput';
import { useSelectOptions } from '../../../../../components/atoms/Input/SelectInput/SelectInput.hooks';
import { TextInput } from '../../../../../components/atoms/Input/TextInput';
import { useTableStore } from '../../../../../components/organisms/Table/Table.store';
import { EMPLOYEE_MAPPERS } from '../../Employee.display';
import { useEmployeeStore } from '../../Employee.store';
import {
	FilterEmployeeFormIntermediateValues,
	filterEmployeeDialogFormSchema,
	FilterEmployeeFormSubmitValues,
} from './FilterDialog.form';

export const FilterDialog = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { closeDialog } = useDialogStore();
	const { pagination } = useTableStore();
	const { displayConfigs } = useEmployeeStore();
	const methods = useForm<FilterEmployeeFormIntermediateValues>({
		resolver: zodResolver(filterEmployeeDialogFormSchema),
		defaultValues: {
			NamePart: searchParams.get('NamePart') ?? '',
			Gender: (searchParams.get('Gender') as any) ?? '',
			Address: searchParams.get('Address') ?? '',
			PositionName: searchParams.get('PositionName') ?? '',
			ExperienceYearsFrom: searchParams.get('ExperienceYearsFrom') ?? '',
			ExperienceYearsTo: searchParams.get('ExperienceYearsTo') ?? '',
			EmployedDateFrom: searchParams.get('EmployedDateFrom') ?? '',
			EmployedDateTo: searchParams.get('EmployedDateTo') ?? '',
			SalaryFrom: searchParams.get('SalaryFrom') ?? '',
			SalaryTo: searchParams.get('SalaryTo') ?? '',
		},
	});
	const positionOptions = useSelectOptions({
		module: 'Positions',
		isEmptyable: true,
	});

	async function handleApplyFilter(rawData: any) {
		/* NOTE: rawData is NOT FilterEmployeeFormIntermediateValues
    Zod 'preprocess' changes some of it */
		console.table(rawData);

		const submitData: FilterEmployeeFormSubmitValues = {
			NamePart: rawData.NamePart,
			Gender: rawData.Gender,
			Address: rawData.Address,
			PositionName: rawData.Position,
			ExperienceYearsFrom: rawData.ExperienceYearsFrom,
			ExperienceYearsTo: rawData.ExperienceYearsTo,
			EmployedDateFrom: rawData.EmployedDateFrom
				? dayjs(rawData.EmployedDateFrom).toISOString()
				: undefined,
			EmployedDateTo: rawData.EmployedDateTo
				? dayjs(rawData.EmployedDateTo).toISOString()
				: undefined,
			SalaryFrom: rawData.SalaryFrom,
			SalaryTo: rawData.SalaryTo,
		};

		console.table(submitData);

		const queryParams = {
			...submitData,
			page: pagination.CurrentPage,
			pageSize: pagination.PageSize,
		};
		const queryString = QueryString.stringify(queryParams);

		setSearchParams(queryString);
		closeDialog();
	}

	function handleError(error: any) {
		console.log(error);
	}

	return (
		<FormProvider {...methods}>
			<form
				className='flex h-fit w-[750px] flex-col items-start gap-2 bg-primary-bright-7 p-4'
				onSubmit={methods.handleSubmit(handleApplyFilter, handleError)}
			>
				<TextInput
					name='NamePart'
					label='Tên'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<SelectInput
					name='Gender'
					optionPairs={addEmptySelectOption({
						selectOptions: EMPLOYEE_MAPPERS['Gender'],
					})}
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='Address'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<SelectInput
					name='PositionName'
					width='medium'
					optionPairs={positionOptions}
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='ExperienceYearsFrom'
					label='Số năm kinh nghiệm từ...'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='ExperienceYearsTo'
					label='...đến'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<DateInput
					isClearable
					name='EmployedDateFrom'
					label='Bắt đầu làm việc từ ngày...'
					width='medium'
					displayConfigs={displayConfigs}
				/>
				<DateInput
					isClearable
					name='EmployedDateTo'
					label='...đến'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='SalaryFrom'
					label='Mức lương từ...'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='SalaryTo'
					label='...đến'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<div className='flex flex-row gap-4'>
					<Button
						type='submit'
						// type='button'
						width='medium'
						onClick={() => {
							console.table(methods.getValues());
						}}
					>
						Lọc
					</Button>

					<Button
						variant='secondary'
						type='button'
						width='medium'
						onClick={() => {
							handleApplyFilter({});
						}}
					>
						Hủy bộ lọc
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
