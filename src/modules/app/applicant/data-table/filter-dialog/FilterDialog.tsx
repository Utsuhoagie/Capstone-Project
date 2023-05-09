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
import { APPLICANT_MAPPERS } from '../../Applicant.display';
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
			NamePart: searchParams.get('NamePart') ?? '',
			Gender: (searchParams.get('Gender') as any) ?? '',
			Address: searchParams.get('Address') ?? '',
			AppliedPositionName: searchParams.get('AppliedPositionName') ?? '',
			ExperienceYearsFrom: searchParams.get('ExperienceYearsFrom') ?? '',
			ExperienceYearsTo: searchParams.get('ExperienceYearsTo') ?? '',
			AppliedDateFrom: searchParams.get('AppliedDateFrom') ?? '',
			AppliedDateTo: searchParams.get('AppliedDateTo') ?? '',
			AskingSalaryFrom: searchParams.get('AskingSalaryFrom') ?? '',
			AskingSalaryTo: searchParams.get('AskingSalaryTo') ?? '',
		},
	});
	const positionOptions = useSelectOptions({
		module: 'Positions',
		isEmptyable: true,
	});

	async function handleApplyFilter(rawData: any) {
		/* NOTE: rawData is NOT FilterApplicantFormIntermediateValues
    Zod 'preprocess' changes some of it */
		console.table(rawData);

		const submitData: FilterApplicantFormSubmitValues = {
			NamePart: rawData.NamePart,
			Gender: rawData.Gender,
			Address: rawData.Address,
			AppliedPositionName: rawData.AppliedPositionName,
			ExperienceYearsFrom: rawData.ExperienceYearsFrom,
			ExperienceYearsTo: rawData.ExperienceYearsTo,
			AppliedDateFrom: rawData.AppliedDateFrom
				? dayjs(rawData.AppliedDateFrom).toISOString()
				: undefined,
			AppliedDateTo: rawData.AppliedDateTo
				? dayjs(rawData.AppliedDateTo).toISOString()
				: undefined,
			AskingSalaryFrom: rawData.AskingSalaryFrom,
			AskingSalaryTo: rawData.AskingSalaryTo,
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
					width='medium'
					optionPairs={addEmptySelectOption({
						selectOptions: APPLICANT_MAPPERS['Gender'],
					})}
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='Address'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<SelectInput
					name='AppliedPositionName'
					width='medium'
					displayConfigs={displayConfigs}
					optionPairs={positionOptions}
				/>

				<TextInput
					name='ExperienceYearsFrom'
					label='Năm kinh nghiệm từ...'
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
					name='AppliedDateFrom'
					label='Ngày nộp hồ sơ từ...'
					width='medium'
					displayConfigs={displayConfigs}
				/>
				<DateInput
					isClearable
					name='AppliedDateTo'
					label='...đến'
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<TextInput
					name='AskingSalaryFrom'
					label='Mức lương từ...'
					width='medium'
					displayConfigs={displayConfigs}
				/>
				<TextInput
					name='AskingSalaryTo'
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
							// handleApplyFilter({});
							setSearchParams();
							closeDialog();
						}}
					>
						Hủy bộ lọc
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
