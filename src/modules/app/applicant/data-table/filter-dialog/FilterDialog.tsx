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
import { useApplicantStore } from '../../Applicant.store';
import {
	FilterApplicantFormIntermediateValues,
	filterApplicantDialogFormSchema,
	FilterApplicantFormSubmitValues,
} from './FilterDialog.form';

export const FilterDialog = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { closeDialog } = useDialogStore();
	const { pagination } = useTableStore();
	const { displayConfigs } = useApplicantStore();
	const methods = useForm<FilterApplicantFormIntermediateValues>({
		resolver: zodResolver(filterApplicantDialogFormSchema),
		defaultValues: {
			SubName: searchParams.get('SubName') ?? '',
			Gender: (searchParams.get('Gender') as any) ?? '',
			Address: searchParams.get('Address') ?? '',
			ExperienceYears: searchParams.get('ExperienceYears') ?? '',
			AppliedPositionName: searchParams.get('AppliedPositionName') ?? '',
			AppliedDateFrom: searchParams.get('AppliedDateFrom') ?? '',
			AppliedDateTo: searchParams.get('AppliedDateTo') ?? '',
			AskingSalary: searchParams.get('AskingSalary') ?? '',
		},
	});

	const handleApplyFilter: SubmitHandler<
		FilterApplicantFormIntermediateValues
	> = async (rawData: any) => {
		/* NOTE: rawData is NOT FilterApplicantFormIntermediateValues
    Zod 'preprocess' changes some of it */
		console.table(rawData);

		const submitData: FilterApplicantFormSubmitValues = {
			SubName: rawData.SubName,
			Gender: rawData.Gender,
			Address: rawData.Address,
			ExperienceYears: rawData.ExperienceYears,
			AppliedPositionName: rawData.AppliedPositionName,
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
				className='flex h-[500px] w-[750px] flex-col items-start gap-2 p-4'
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
					width='medium'
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
					name='AppliedPositionName'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<DateInput
					isClearable
					name='AppliedDateFrom'
					label='Từ'
					width='medium'
					displayConfigs={displayConfigs}
				/>
				<DateInput
					isClearable
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
