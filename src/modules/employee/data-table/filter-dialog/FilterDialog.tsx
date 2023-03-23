import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import QueryString from 'query-string';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useDialogStore } from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../components/atoms/Input/DateTimeInput/DateInput';
import { SelectInput } from '../../../../components/atoms/Input/SelectInput/SelectInput';
import { TextInput } from '../../../../components/atoms/Input/TextInput';
import { useTableStore } from '../../../../components/organisms/Table/Table.store';
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
			SubName: searchParams.get('SubName') ?? '',
			Gender: (searchParams.get('Gender') as any) ?? '',
			Address: searchParams.get('Address') ?? '',
			ExperienceYears: searchParams.get('ExperienceYears') ?? '',
			AppliedPositionName: searchParams.get('AppliedPosition') ?? '',
			AppliedDateFrom: searchParams.get('AppliedDateFrom') ?? '',
			AppliedDateTo: searchParams.get('AppliedDateTo') ?? '',
			AskingSalary: searchParams.get('AskingSalary') ?? '',
		},
	});

	const handleApplyFilter: SubmitHandler<
		FilterEmployeeFormIntermediateValues
	> = async (rawData: any) => {
		/* NOTE: rawData is NOT FilterEmployeeFormIntermediateValues
    Zod 'preprocess' changes some of it */
		console.table(rawData);

		const submitData: FilterEmployeeFormSubmitValues = {
			SubName: rawData.SubName,
			Gender: rawData.Gender,
			Address: rawData.Address,
			ExperienceYears: rawData.ExperienceYears,
			AppliedPositionName: rawData.AppliedPosition,
			AppliedDateFrom: rawData.AppliedDateFrom
				? dayjs(rawData.AppliedDateFrom).toISOString()
				: undefined,
			AppliedDateTo: rawData.AppliedDateTo
				? dayjs(rawData.AppliedDateTo).toISOString()
				: undefined,
			AskingSalary: rawData.AskingSalary,
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
	};

	function handleError(error: any) {
		console.log(error);
	}

	return (
		<FormProvider {...methods}>
			<form
				className='flex h-[450px] w-[600px] flex-col items-start gap-2 p-4'
				onSubmit={methods.handleSubmit(handleApplyFilter, handleError)}
			>
				<TextInput
					name='SubName'
					label='Tên'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<SelectInput
					name='Gender'
					optionPairs={['', 'male', 'female', 'other']}
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='Address'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='ExperienceYears'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='AppliedPosition'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<DateInput
					name='AppliedDateFrom'
					label='Từ'
					width='medium'
					displayConfigs={displayConfigs}
				/>
				<DateInput
					name='AppliedDateTo'
					label='Đến'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='AskingSalary'
					width='medium'
					displayConfigs={displayConfigs}
				/>

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
			</form>
		</FormProvider>
	);
};
