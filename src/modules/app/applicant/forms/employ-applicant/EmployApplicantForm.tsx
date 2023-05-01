import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
	Employee,
	Employee_API_Request,
} from '../../../employee/Employee.interface';
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
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { displayConfigs } = useApplicantStore();
	const { displayConfigs: employeeDisplayConfigs } = useEmployeeStore();

	const { NationalId } = useParams();
	const positionOptions = useSelectOptions({ module: 'Positions' });
	const queryClient = useQueryClient();
	const mutation = useMutation(
		'applicants/employ',
		async (formData: FormData) => {
			const res = await API.post(`Applicants/Employ/${NationalId}`, formData, {
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
				queryClient.invalidateQueries('applicants');
				queryClient.invalidateQueries('employees');
			},
		}
	);

	const methods = useForm<EmployApplicantFormIntermediateValues>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: async () => {
			const res = await API.get(`Applicants/${NationalId}`);

			if (res.status >= 300) {
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
				};
			}

			const selectedApplicant = mapToApplicant(res.data);
			const imageRes = await API.get(
				`Files/Image/Applicants/${selectedApplicant.ImageFileName}`,
				{ responseType: 'blob' }
			);

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
				Image: imageRes.data
					? new File([imageRes.data], `${selectedApplicant.NationalId}.jpeg`)
					: undefined,
			};
		},
		resolver: zodResolver(employApplicantFormSchema),
	});

	const isFormLoading = methods.formState.isLoading;

	const handleSubmit: SubmitHandler<EmployApplicantFormIntermediateValues> = (
		rawData
	) => {
		console.table(rawData);

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
			EmployedDate: dayjs(rawData.EmployedDate).toDate(),
			Salary: parseInt(rawData.Salary),
			HasUser: false,
			Image: rawData.Image,
		};

		const formData = convertFromDomainObjToFormData(req);
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
						<div className='flex flex-row justify-between'>
							<div className='flex flex-col gap-2'>
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
									required
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
							</div>

							<ImageInput name='Image' />
						</div>

						<Button type='submit' width='medium'>
							Tuyển
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
							variant='secondary'
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
