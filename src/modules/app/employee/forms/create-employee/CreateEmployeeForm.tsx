import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { range } from 'ramda';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IS_DEBUG_MODE } from '../../../../../app/App';
import { convertFromDomainObjToFormData } from '../../../../../app/App.form';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../../app/App.store';
import { Button } from '../../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../../components/atoms/Input/DateTimeInput/DateInput';
import { TimeInput } from '../../../../../components/atoms/Input/DateTimeInput/TimeInput';
import { ImageInput } from '../../../../../components/atoms/Input/ImageInput/ImageInput';
import { SelectInput } from '../../../../../components/atoms/Input/SelectInput/SelectInput';
import { useSelectOptions } from '../../../../../components/atoms/Input/SelectInput/SelectInput.hooks';
import { TextInput } from '../../../../../components/atoms/Input/TextInput';
import { API } from '../../../../../config/axios/axios.config';
import { useAuthStore } from '../../../../auth/Auth.store';
import { EMPLOYEE_MAPPERS } from '../../Employee.display';
import { Employee, Employee_API_Request } from '../../Employee.interface';
import { useEmployeeStore } from '../../Employee.store';
import {
	CreateEmployeeFormIntermediateValues,
	createEmployeeFormSchema,
} from './CreateEmployeeForm.form';

export const CreateEmployeeForm = () => {
	const navigate = useNavigate();
	const { accessToken } = useAuthStore();
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { displayConfigs } = useEmployeeStore();
	const positionOptions = useSelectOptions({ module: 'Positions' });
	const queryClient = useQueryClient();
	const mutation = useMutation(
		'employees/create',
		async (formData: FormData) => {
			const res = await API.post('Employees/Create', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			if (res.status <= 299) {
				showToast({ state: 'success' });
			} else {
				showToast({ state: 'error' });
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('employees');
				queryClient.invalidateQueries('files');
			},
		}
	);

	const methods = useForm<CreateEmployeeFormIntermediateValues>({
		mode: 'onSubmit',
		defaultValues: {
			NationalId: '',
			FullName: '',
			Gender: 'male',
			BirthDate: '',
			Address: '',
			Phone: '',
			Email: '',
			ExperienceYears: '',
			PositionName: '',
			EmployedDate: dayjs().toISOString(),
			Salary: '',
			Image: undefined,
		},
		resolver: zodResolver(createEmployeeFormSchema),
	});

	const handleSubmit: SubmitHandler<CreateEmployeeFormIntermediateValues> = (
		rawData
	) => {
		console.log(rawData);

		const req: Employee_API_Request = {
			NationalId: rawData.NationalId,
			FullName: rawData.FullName,
			Gender: rawData.Gender,
			BirthDate: rawData.BirthDate
				? dayjs(rawData.BirthDate).toDate()
				: undefined,
			Address: rawData.Address,
			Phone: rawData.Phone,
			Email: rawData.Email,
			ExperienceYears: parseInt(rawData.ExperienceYears),
			PositionName: rawData.PositionName,
			EmployedDate: dayjs(rawData.BirthDate).toDate(),
			Salary: parseInt(rawData.Salary),
			HasUser: false,
			Image: rawData.Image,
		};

		const formData = convertFromDomainObjToFormData(req);
		// console.log({ formData });
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận tạo hồ sơ nhân viên?',
			onConfirm: () => {
				mutation.mutate(formData);
				navigate('/app/employees');
			},
			onSuccess: () => {
				window.alert('aaaaaa');
			},
		});
	};
	const handleError = (error) => {
		console.log({ error });
	};

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Thêm hồ sơ Nhân viên mới</h1>
			<FormProvider {...methods}>
				<form
					className='flex flex-col gap-2 p-2'
					onSubmit={methods.handleSubmit(handleSubmit, handleError)}
				>
					<div className='flex flex-row justify-between'>
						<div className='flex flex-col gap-2'>
							<TextInput
								required
								name='NationalId'
								placeholder='Nhập 9 hoặc 12 số.'
								width='medium'
								displayConfigs={displayConfigs}
							/>
							<TextInput
								required
								name='FullName'
								placeholder='Nhập họ tên đầy đủ.'
								width='medium'
								displayConfigs={displayConfigs}
							/>
							<SelectInput
								required
								name='Gender'
								placeholder='Chọn 1.'
								width='medium'
								optionPairs={EMPLOYEE_MAPPERS['Gender']}
								displayConfigs={displayConfigs}
							/>
							<DateInput
								name='BirthDate'
								placeholder='Chọn ngày sinh.'
								width='medium'
								maxDate={dayjs().subtract(18, 'year').toDate()}
								openToDate={dayjs().year(2000).startOf('year').toDate()}
								displayConfigs={displayConfigs}
							/>
							<TextInput
								required
								name='Address'
								placeholder='Số nhà, Đường, Phường/Xã, Tỉnh/Thành phố'
								width='medium'
								displayConfigs={displayConfigs}
							/>
							<TextInput
								required
								name='Phone'
								placeholder='Nhập số điện thoại.'
								width='medium'
								displayConfigs={displayConfigs}
							/>
							<TextInput
								required
								name='Email'
								placeholder='Nhập địa chỉ email.'
								width='medium'
								displayConfigs={displayConfigs}
							/>
							<TextInput
								required
								type='number'
								name='ExperienceYears'
								placeholder='Nhập số năm kinh nghiệm.'
								width='medium'
								displayConfigs={displayConfigs}
							/>
							<SelectInput
								required
								name='PositionName'
								placeholder='Nhập vị trí ứng tuyển.'
								width='medium'
								optionPairs={positionOptions}
								displayConfigs={displayConfigs}
							/>
							<DateInput
								required
								name='EmployedDate'
								placeholder='Chọn ngày bắt đầu làm việc.'
								width='medium'
								displayConfigs={displayConfigs}
							/>
							<TextInput
								required
								type='number'
								name='Salary'
								width='medium'
								placeholder='Nhập mức lương.'
								displayConfigs={displayConfigs}
							/>
						</div>

						<ImageInput name='Image' />
					</div>

					<Button type='submit' width='medium'>
						Thêm
					</Button>
					{IS_DEBUG_MODE && (
						<Button
							type='button'
							width='medium'
							onClick={() => console.log(methods.getValues())}
						>
							Xem form
						</Button>
					)}
					<Button
						type='button'
						variant='secondary'
						width='medium'
						onClick={() => navigate('/app/employees')}
					>
						Thoát
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
