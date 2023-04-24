import { ExtFile, FileInputButton } from '@files-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IS_DEBUG_MODE } from '../../../../../app/App';
import { convertFromDomainObjToFormData } from '../../../../../app/App.form';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../../app/App.store';
import { Button } from '../../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../../components/atoms/Input/DateTimeInput/DateInput';
import { ImageInput } from '../../../../../components/atoms/Input/ImageInput/ImageInput';
import { SelectInput } from '../../../../../components/atoms/Input/SelectInput/SelectInput';
import { useSelectOptions } from '../../../../../components/atoms/Input/SelectInput/SelectInput.hooks';
import { TextInput } from '../../../../../components/atoms/Input/TextInput';
import { PagedResult } from '../../../../../components/organisms/Table/Pagination/Pagination.interface';
import { API } from '../../../../../config/axios/axios.config';
import { useAuthStore } from '../../../../auth/Auth.store';
import { createImageUrl } from '../../../file/File.utils';
import {
	Position,
	Position_API_Response,
} from '../../../position/Position.interface';
import { usePositionStore } from '../../../position/Position.store';
import { APPLICANT_MAPPERS } from '../../Applicant.display';
import { Applicant, Applicant_API_Request } from '../../Applicant.interface';
import { useApplicantStore } from '../../Applicant.store';
import {
	CreateApplicantFormIntermediateValues,
	createApplicantFormSchema,
} from './CreateApplicantForm.form';
import PLACEHOLDER_PERSON_IMAGE from '../../../../../assets/img/PLACEHOLDER_PERSON_IMAGE.png';

export const CreateApplicantForm = () => {
	const navigate = useNavigate();

	const { accessToken } = useAuthStore();
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { displayConfigs } = useApplicantStore();
	const allPositionOptions = useSelectOptions({ module: 'Positions' });

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'applicants/create',
		async (formData: FormData) => {
			const res = await API.post('Applicants/Create', formData, {
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
			},
		}
	);

	const methods = useForm<CreateApplicantFormIntermediateValues>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: {
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
			Image: undefined,
		},
		resolver: zodResolver(createApplicantFormSchema),
	});

	const handleSubmit: SubmitHandler<CreateApplicantFormIntermediateValues> = (
		rawData
	) => {
		console.log(rawData);

		const req: Applicant_API_Request = {
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
			AppliedPositionName: rawData.AppliedPositionName,
			AppliedDate: dayjs(rawData.AppliedDate).toDate(),
			AskingSalary: parseInt(rawData.AskingSalary),
			Image: rawData.Image,
		};

		console.table(req);
		const formData = convertFromDomainObjToFormData(req);
		console.log([...formData]);

		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận tạo hồ sơ ứng viên?',
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
			<h1 className='text-h1'>Thêm hồ sơ Ứng viên mới</h1>
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
								name='AppliedPositionName'
								placeholder='Nhập vị trí ứng tuyển.'
								width='medium'
								optionPairs={allPositionOptions}
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
								name='AskingSalary'
								type='number'
								width='medium'
								placeholder='Nhập mức lương đề nghị.'
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
