import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL, IS_DEBUG_MODE } from '../../../../app/App';
import { useToastStore } from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../components/atoms/Input/DateTimeInput/DateInput';
import { TimeInput } from '../../../../components/atoms/Input/DateTimeInput/TimeInput';
import { SelectInput } from '../../../../components/atoms/Input/SelectInput';
import { TextInput } from '../../../../components/atoms/Input/TextInput';
import { useRefresh } from '../../../auth/Auth.hooks';
import { useAuthStore } from '../../../auth/Auth.store';
import { Employee } from '../../Employee.interface';
import { useEmployeeStore } from '../../Employee.store';
import {
	UpdateEmployeeFormIntermediateValues,
	updateEmployeeFormSchema,
} from './UpdateEmployeeForm.form';

export const UpdateEmployeeForm = () => {
	const navigate = useNavigate();
	const { accessToken } = useAuthStore();
	useRefresh();

	const selectedEmployee = useEmployeeStore(
		(state) => state.selectedEmployee
	) as Employee;

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'employees/update',
		async (formData: Employee) => {
			const res = await fetch(
				`${BASE_URL}/Employees/Update?NationalId=${selectedEmployee.NationalId}`,
				{
					headers: {
						'Authorization': `Bearer ${accessToken}`,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'PUT',
					body: JSON.stringify(formData),
				}
			);

			if (res.ok) {
				showToast({ state: 'success' });
			} else {
				showToast({ state: 'error' });
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('employees');
			},
		}
	);

	const showToast = useToastStore((state) => state.showToast);

	const methods = useForm<UpdateEmployeeFormIntermediateValues>({
		mode: 'onSubmit',
		defaultValues: {
			NationalId: selectedEmployee.NationalId,
			FullName: selectedEmployee.FullName,
			Gender: selectedEmployee.Gender,
			BirthDate: selectedEmployee.BirthDate
				? dayjs(selectedEmployee.BirthDate).toISOString()
				: undefined,
			Address: selectedEmployee.Address,
			Phone: selectedEmployee.Phone,
			Email: selectedEmployee.Email,
			ExperienceYears: `${selectedEmployee.ExperienceYears}`,
			Position: selectedEmployee.Position,
			EmployedDate: dayjs(selectedEmployee.EmployedDate).toISOString(),
			Salary: `${selectedEmployee.Salary}`,
			StartHour: dayjs()
				.hour(selectedEmployee.StartHour)
				.startOf('hour')
				.toISOString(),
			EndHour: dayjs()
				.hour(selectedEmployee.EndHour)
				.startOf('hour')
				.toISOString(),
		},
		resolver: zodResolver(updateEmployeeFormSchema),
	});

	const displayConfigs = useEmployeeStore((state) => state.displayConfigs);

	const handleSubmit: SubmitHandler<UpdateEmployeeFormIntermediateValues> = (
		rawData
	) => {
		console.log(rawData);

		const formData: Employee = {
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
			Position: rawData.Position,
			EmployedDate: dayjs(rawData.EmployedDate).toDate(),
			Salary: parseInt(rawData.Salary),
			StartHour: dayjs(rawData.StartHour).hour(),
			EndHour: dayjs(rawData.StartHour).hour(),
		};

		// console.log({ formData });
		mutation.mutate(formData);
	};
	const handleError = (error) => {
		console.log({ error });
	};

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Chỉnh sửa hồ sơ Nhân viên</h1>
			<FormProvider {...methods}>
				<form
					className='flex flex-col gap-2 p-2'
					onSubmit={methods.handleSubmit(handleSubmit, handleError)}
				>
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
						options={['male', 'female', 'other']}
						displayConfigs={displayConfigs}
					/>

					<DateInput
						name='BirthDate'
						placeholder='Chọn ngày sinh.'
						width='medium'
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
						name='Email'
						placeholder='Nhập địa chỉ email.'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<TextInput
						required
						name='ExperienceYears'
						type='number'
						placeholder='Nhập số năm kinh nghiệm.'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<TextInput
						required
						name='Position'
						placeholder='Nhập vị trí.'
						width='medium'
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
						name='Salary'
						type='number'
						width='medium'
						placeholder='Nhập mức lương.'
						displayConfigs={displayConfigs}
					/>

					<TimeInput
						required
						name='StartHour'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<TimeInput
						required
						name='EndHour'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<Button type='submit' width='medium'>
						Thêm
					</Button>
					{IS_DEBUG_MODE && (
						<Button
							type='button'
							width='medium'
							onClick={() => console.log('getValues', methods.getValues())}
						>
							Xem form
						</Button>
					)}
					<Button
						type='button'
						secondary
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
