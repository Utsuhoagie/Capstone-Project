import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IS_DEBUG_MODE } from '../../../../../app/App';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../../app/App.store';
import { Button } from '../../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../../components/atoms/Input/DateTimeInput/DateInput';
import { SelectInput } from '../../../../../components/atoms/Input/SelectInput/SelectInput';
import { useSelectOptions } from '../../../../../components/atoms/Input/SelectInput/SelectInput.hooks';
import { TextInput } from '../../../../../components/atoms/Input/TextInput';
import { API } from '../../../../../config/axios/axios.config';
import { useAuthStore } from '../../../../auth/Auth.store';
import { APPLICANT_MAPPERS } from '../../Applicant.display';
import { Applicant, mapToApplicant } from '../../Applicant.interface';
import { useApplicantStore } from '../../Applicant.store';
import {
	UpdateApplicantFormIntermediateValues,
	updateApplicantFormSchema,
} from './UpdateApplicantForm.form';

export const UpdateApplicantForm = () => {
	const navigate = useNavigate();
	const { accessToken } = useAuthStore();
	const { NationalId } = useParams();

	const queryClient = useQueryClient();
	const positionOptions = useSelectOptions({ module: 'Positions' });
	const mutation = useMutation(
		'applicants/update',
		async (formData: Applicant) => {
			const res = await API.put(`Applicants/Update/${NationalId}`, formData);

			if (res.status <= 299) {
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

	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { displayConfigs } = useApplicantStore();

	const methods = useForm<UpdateApplicantFormIntermediateValues>({
		mode: 'onSubmit',
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
					AppliedPositionName: '',
					AppliedDate: dayjs().toISOString(),
					AskingSalary: '',
				};
			}

			const selectedApplicant = mapToApplicant(res.data);

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
				AppliedPositionName: selectedApplicant.AppliedPositionName,
				AppliedDate: dayjs(selectedApplicant.AppliedDate).toISOString(),
				AskingSalary: `${selectedApplicant.AskingSalary}`,
			};
		},
		resolver: zodResolver(updateApplicantFormSchema),
	});

	const handleSubmit: SubmitHandler<UpdateApplicantFormIntermediateValues> = (
		rawData
	) => {
		console.log(rawData);

		const formData: Applicant = {
			NationalId: rawData.NationalId,
			FullName: rawData.FullName,
			Gender: rawData.Gender,
			BirthDate: Boolean(rawData.BirthDate)
				? dayjs(rawData.BirthDate).toDate()
				: undefined,
			Address: rawData.Address,
			Phone: rawData.Phone,
			Email: rawData.Email,
			ExperienceYears: parseInt(rawData.ExperienceYears),
			AppliedPositionName: rawData.AppliedPositionName,
			AppliedDate: dayjs(rawData.AppliedDate).toDate(),
			AskingSalary: parseInt(rawData.AskingSalary),
		};

		// console.log({ formData });
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận cập nhật hồ sơ ứng viên này?',
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
		console.log({ error });
	};

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Chỉnh sửa hồ sơ Ứng viên</h1>
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
						width='medium'
						placeholder='Chọn 1.'
						optionPairs={APPLICANT_MAPPERS['Gender']}
						displayConfigs={displayConfigs}
					/>

					<DateInput
						isClearable
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
						name='AppliedPositionName'
						placeholder='Nhập vị trí ứng tuyển.'
						width='medium'
						optionPairs={positionOptions}
						displayConfigs={displayConfigs}
					/>

					<DateInput
						required
						name='AppliedDate'
						placeholder='Chọn ngày nộp hồ sơ ứng tuyển.'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<TextInput
						required
						type='number'
						name='AskingSalary'
						width='medium'
						placeholder='Nhập mức lương đề nghị.'
						displayConfigs={displayConfigs}
					/>

					<Button type='submit' width='medium'>
						Cập nhật
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
						onClick={() => navigate('/app/applicants')}
					>
						Thoát
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
