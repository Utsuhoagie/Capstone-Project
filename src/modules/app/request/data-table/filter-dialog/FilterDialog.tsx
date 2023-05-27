import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import QueryString from 'query-string';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
	addEmptySelectOption,
	getDisplayForFieldValue,
} from '../../../../../app/App.display';
import { useDialogStore } from '../../../../../app/App.store';
import { Button } from '../../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../../components/atoms/Input/DateTimeInput/DateInput';
import { SelectInput } from '../../../../../components/atoms/Input/SelectInput/SelectInput';
import { useSelectOptions } from '../../../../../components/atoms/Input/SelectInput/SelectInput.hooks';
import { TextInput } from '../../../../../components/atoms/Input/TextInput';
import { useTableStore } from '../../../../../components/organisms/Table/Table.store';
import { RequestStatus } from '../../Request.interface';
import { useRequestStore } from '../../Request.store';
import {
	FilterRequestFormIntermediateValues,
	filterRequestDialogFormSchema,
	FilterRequestFormSubmitValues,
} from './FilterDialog.form';

export const FilterDialog = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { closeDialog } = useDialogStore();
	const { pagination } = useTableStore();
	const { displayConfigs } = useRequestStore();

	console.log(
		'reqstatus',
		getDisplayForFieldValue({
			displayConfigs,
			field: 'RequestStatus',
			value: Number(searchParams.get('RequestStatus')),
		})
	);

	const methods = useForm<FilterRequestFormIntermediateValues>({
		resolver: zodResolver(filterRequestDialogFormSchema),
		defaultValues: {
			Type: (searchParams.get('Type') as any) ?? '',
			RequestStatus: (searchParams.get('RequestStatus') as any)
				? (getDisplayForFieldValue({
						displayConfigs,
						field: 'RequestStatus',
						value: searchParams.get('RequestStatus') as any,
				  }) as any)
				: '',
		},
	});

	async function handleApplyFilter(rawData: any) {
		/* NOTE: rawData is NOT FilterEmployeeFormIntermediateValues
    Zod 'preprocess' changes some of it */
		console.log('raw ', rawData);

		const submitData: FilterRequestFormSubmitValues = {
			Type: rawData.Type,
			RequestStatus: rawData.RequestStatus,
		};

		console.log('submit ', submitData);

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
				className='flex h-[300px] w-[750px] flex-col items-start gap-8 bg-primary-bright-7 p-4'
				onSubmit={methods.handleSubmit(handleApplyFilter, handleError)}
			>
				<SelectInput
					name='Type'
					label='Loại yêu cầu'
					optionPairs={[
						{
							value: '',
							display: '',
						},
						{
							value: 'Raise',
							display: 'Tăng lương',
						},
						{
							value: 'Leave',
							display: 'Nghỉ phép',
						},
						{
							value: 'Other',
							display: 'Khác',
						},
					]}
					width='medium'
					displayConfigs={displayConfigs}
				/>

				<SelectInput
					name='RequestStatus'
					width='medium'
					label='Trạng thái'
					optionPairs={[
						{ value: '', display: '' },
						{
							value: RequestStatus.Pending,
							display: 'Chờ xử lý',
						},
						{
							value: RequestStatus.Accepted,
							display: 'Chấp nhận',
						},
						{
							value: RequestStatus.Rejected,
							display: 'Từ chối',
						},
					]}
					displayConfigs={displayConfigs}
				/>

				{/* <div
					className='h-8 w-8 bg-red-500'
					onClick={() => console.log('form values', methods.getValues())}
				></div> */}

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
