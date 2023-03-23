import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, IS_DEBUG_MODE } from '../../../../app/App';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../components/atoms/Input/DateTimeInput/DateInput';
import { TimeInput } from '../../../../components/atoms/Input/DateTimeInput/TimeInput';
import { SelectInput } from '../../../../components/atoms/Input/SelectInput/SelectInput';
import { useSelectOptions } from '../../../../components/atoms/Input/SelectInput/SelectInput.hooks';
import { TextInput } from '../../../../components/atoms/Input/TextInput';
import { useRefresh } from '../../../auth/Auth.hooks';
import { useAuthStore } from '../../../auth/Auth.store';
import { Employee } from '../../../employee/Employee.interface';
import { useEmployeeStore } from '../../../employee/Employee.store';
import { usePositionStore } from '../../../position/Position.store';
import { APPLICANT_MAPPERS } from '../../Applicant.display';
import { mapToApplicant } from '../../Applicant.interface';
import { useApplicantStore } from '../../Applicant.store';
import {
	EmployApplicantFormIntermediateValues,
	employApplicantFormSchema,
} from './EmployApplicantForm.form';

export const EmployApplicantForm = () => {
	const navigate = useNavigate();
	const { accessToken } = useAuthStore();
	useRefresh();

	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { displayConfigs } = useApplicantStore();
	const { displayConfigs: employeeDisplayConfigs } = useEmployeeStore();

	const { NationalId } = useParams();
	const positionOptions = useSelectOptions({ module: 'Positions' });
	const queryClient = useQueryClient();
	const mutation = useMutation(
		'applicants/employ',
		async (formData: Employee) => {
			const res = await fetch(`${BASE_URL}/Applicants/Employ/${NationalId}`, {
				headers: {
					'Authorization': `Bearer ${accessToken}`,
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
				queryClient.invalidateQueries('applicants');
			},
		}
	);

	const methods = useForm<EmployApplicantFormIntermediateValues>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: async () => {
			const res = await fetch(`${BASE_URL}/Applicants/${NationalId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (!res.ok) {
				console.log('not OK');
				return {
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
					StartHour: dayjs().hour(9).startOf('hour').toISOString(),
					EndHour: dayjs().hour(18).startOf('hour').toISOString(),
				};
			}

			const data = await res.json();
			const selectedApplicant = mapToApplicant(data);

			console.log('OK', selectedApplicant);
			return {
				NationalId: selectedApplicant.NationalId,
				FullName: selectedApplicant.FullName,
				Gender: selectedApplicant.Gender,
				BirthDate: selectedApplicant.BirthDate
					? dayjs(selectedApplicant.BirthDate).toISOString()
					: '',
				Address: selectedApplicant.Address,
				Phone: selectedApplicant.Phone,
				Email: selectedApplicant.Email,
				ExperienceYears: `${selectedApplicant.ExperienceYears}`,
				PositionName: selectedApplicant.AppliedPositionName,
				EmployedDate: dayjs().toISOString(),
				Salary: `${selectedApplicant.AskingSalary}`,
				StartHour: dayjs().hour(9).startOf('hour').toISOString(),
				EndHour: dayjs().hour(18).startOf('hour').toISOString(),
			};
		},
		resolver: zodResolver(employApplicantFormSchema),
	});

	const isFormLoading = methods.formState.isLoading;

	const handleSubmit: SubmitHandler<EmployApplicantFormIntermediateValues> = (
		rawData
	) => {
		console.table(rawData);

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
			PositionName: rawData.PositionName,
			EmployedDate: dayjs(rawData.EmployedDate).toDate(),
			Salary: parseInt(rawData.Salary),
			StartHour: dayjs(rawData.StartHour).hour(),
			EndHour: dayjs(rawData.EndHour).hour(),
		};

		// console.log({ formData });
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận tuyển ứng viên này?',
			onConfirm: () => {
				mutation.mutate(formData);
				navigate('/app/applicants');
			},
			onSuccess: () => {
				window.alert('aaaaaa');
			},
		});
	};

	const handleError = (error) => {
		console.table(error);
	};

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Tuyển Ứng viên</h1>
			{isFormLoading || (
				<FormProvider {...methods}>
					<form
						className='flex flex-col gap-2 p-2'
						onSubmit={methods.handleSubmit(handleSubmit, handleError)}
					>
						<TextInput
							disabled
							required
							name='NationalId'
							placeholder='Nhập 9 hoặc 12 số.'
							width='medium'
							displayConfigs={displayConfigs}
						/>

						<TextInput
							disabled
							required
							name='FullName'
							placeholder='Nhập họ tên đầy đủ.'
							width='medium'
							displayConfigs={displayConfigs}
						/>

						<SelectInput
							disabled
							required
							name='Gender'
							width='medium'
							placeholder='Chọn 1.'
							optionPairs={APPLICANT_MAPPERS['Gender']}
							displayConfigs={displayConfigs}
						/>

						<DateInput
							disabled
							name='BirthDate'
							placeholder='Chọn ngày sinh.'
							width='medium'
							displayConfigs={displayConfigs}
						/>

						<TextInput
							disabled
							required
							name='Address'
							placeholder='Số nhà, Đường, Phường/Xã, Tỉnh/Thành phố'
							width='medium'
							displayConfigs={displayConfigs}
						/>

						<TextInput
							disabled
							required
							name='Phone'
							placeholder='Nhập số điện thoại.'
							width='medium'
							displayConfigs={displayConfigs}
						/>

						<TextInput
							disabled
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

						<SelectInput
							required
							name='PositionName'
							placeholder='Nhập vị trí.'
							width='medium'
							optionPairs={positionOptions}
							displayConfigs={employeeDisplayConfigs}
						/>

						<DateInput
							required
							name='EmployedDate'
							placeholder='Chọn ngày bắt đầu làm việc.'
							width='medium'
							displayConfigs={employeeDisplayConfigs}
						/>

						<TextInput
							required
							name='Salary'
							type='number'
							width='medium'
							placeholder='Nhập mức lương.'
							displayConfigs={employeeDisplayConfigs}
						/>

						<TimeInput
							required
							name='StartHour'
							width='medium'
							placeholder='Chọn thời gian bắt đầu ca.'
							displayConfigs={employeeDisplayConfigs}
						/>

						<TimeInput
							required
							name='EndHour'
							width='medium'
							placeholder='Chọn thời gian kết thúc ca.'
							displayConfigs={employeeDisplayConfigs}
						/>

						<Button type='submit' width='medium'>
							Thêm
						</Button>
						{IS_DEBUG_MODE && (
							<Button
								type='button'
								width='medium'
								onClick={() => console.table(methods.getValues())}
							>
								Xem form
							</Button>
						)}
						<Button
							type='button'
							secondary
							width='medium'
							onClick={() => navigate('/app/applicants')}
						>
							Thoát
						</Button>
					</form>
				</FormProvider>
			)}
		</div>
	);
};
