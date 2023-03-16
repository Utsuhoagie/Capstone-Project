import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { range } from 'ramda';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../app/App';
import { useToastStore } from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../components/atoms/Input/DateTimeInput/DateInput';
import { TimeInput } from '../../../../components/atoms/Input/DateTimeInput/TimeInput';
import { SelectInput } from '../../../../components/atoms/Input/SelectInput';
import { TextInput } from '../../../../components/atoms/Input/TextInput';
import { Employee } from '../../Employee.interface';
import { useEmployeeStore } from '../../Employee.store';
import {
	CreateEmployeeFormIntermediateValues,
	createEmployeeFormSchema,
} from './CreateEmployeeForm.form';

export const CreateEmployeeForm = () => {
	const navigate = useNavigate();

	const showToast = useToastStore((state) => state.showToast);

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'employees/create',
		async (formData: Employee) => {
			const res = await fetch(`${BASE_URL}/Employees/Create`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(formData),
			});

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
			Position: '',
			EmployedDate: dayjs().toISOString(),
			Salary: '',
			StartHour: dayjs().hour(9).startOf('hour').toISOString(),
			EndHour: dayjs().hour(18).startOf('hour').toISOString(),
		},
		resolver: zodResolver(createEmployeeFormSchema),
	});

	const displayConfigs = useEmployeeStore((state) => state.displayConfigs);

	const handleSubmit: SubmitHandler<CreateEmployeeFormIntermediateValues> = (
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
			EmployedDate: dayjs(rawData.BirthDate).toDate(),
			Salary: parseInt(rawData.Salary),
			StartHour: dayjs(rawData.StartHour).hour(),
			EndHour: dayjs(rawData.EndHour).hour(),
		};

		// console.log({ formData });
		mutation.mutate(formData);
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
						type='number'
						name='ExperienceYears'
						placeholder='Nhập số năm kinh nghiệm.'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<TextInput
						required
						name='Position'
						placeholder='Nhập vị trí ứng tuyển.'
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
						type='number'
						name='Salary'
						width='medium'
						placeholder='Nhập mức lương.'
						displayConfigs={displayConfigs}
					/>

					{/* <SelectInput
						required
						name='StartHour'
						placeholder=''
						width='medium'
						displayConfigs={displayConfigs}
						options={range(0, 23)}
					/> */}

					<TimeInput
						required
						name='StartHour'
						placeholder='Chọn thời gian bắt đầu ca.'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<TimeInput
						required
						name='EndHour'
						placeholder='Chọn thời gian kết thúc ca.'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<Button type='submit' width='medium'>
						Thêm
					</Button>
					<Button
						type='button'
						width='medium'
						onClick={() => console.log(methods.getValues())}
					>
						Xem form
					</Button>
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
