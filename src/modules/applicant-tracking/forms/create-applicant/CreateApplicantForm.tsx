import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../components/atoms/Input/DateInput/DateInput';
import { SelectInput } from '../../../../components/atoms/Input/SelectInput';
import { TextInput } from '../../../../components/atoms/Input/TextInput';
import { useApplicantTrackingStore } from '../../ApplicantTracking.store';
import {
	CreateApplicantFormIntermediateValues,
	createApplicantFormSchema,
} from './CreateApplicantForm.form';

export const CreateApplicantForm = () => {
	const navigate = useNavigate();

	const methods = useForm<CreateApplicantFormIntermediateValues>({
		mode: 'onSubmit',
		defaultValues: {
			NationalId: '',
			FullName: '',
			Gender: 'male',
			BirthDate: undefined,
			Address: '',
			Phone: '',
			Email: '',
			ExperienceYears: '',
			AppliedPosition: '',
			AppliedDate: dayjs().toDate(),
			AskingSalary: '',
		},
		resolver: zodResolver(createApplicantFormSchema),
	});

	const displayConfigs = useApplicantTrackingStore(
		(state) => state.displayConfigs
	);

	const handleSubmit: SubmitHandler<CreateApplicantFormIntermediateValues> = (
		data
	) => {
		console.log(data);
	};
	const handleError = (error) => {
		console.log(error);
	};

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Thêm hồ sơ Ứng viên mới</h1>
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
						name='AppliedPosition'
						placeholder='Nhập vị trí ứng tuyển.'
						width='medium'
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
						Thêm
					</Button>
					<Button
						type='button'
						secondary
						width='medium'
						// onClick={() => navigate('/app/applicant-tracking')}
						onClick={() => console.log(methods.getValues())}
					>
						Thoát
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
