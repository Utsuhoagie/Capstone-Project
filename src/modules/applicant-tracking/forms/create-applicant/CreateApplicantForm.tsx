import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
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
	const methods = useForm<CreateApplicantFormIntermediateValues>({
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
			AppliedPosition: '',
			AppliedDate: '',
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
				<form onSubmit={methods.handleSubmit(handleSubmit, handleError)}>
					<TextInput
						name='NationalId'
						label='Số CMND/CCCD'
						placeholder='Nhập 9 hoặc 12 số.'
						width='medium'
					/>

					<TextInput
						name='FullName'
						label='Họ tên'
						placeholder='Nhập họ tên đầy đủ.'
						width='medium'
					/>

					<SelectInput
						name='Gender'
						label='Giới tính'
						placeholder='Chọn 1.'
						options={['male', 'female', 'other']}
						displayConfigs={displayConfigs}
					/>

					{/* <TextInput
						name='BirthDate'
						label='Họ tên'
						placeholder='Nhập họ tên đầy đủ.'
						width='medium'
					/> */}

					<DateInput name='BirthDate' label='Ngày sinh' width='medium' />

					<TextInput
						name='Address'
						label='Địa chỉ'
						placeholder='Số nhà, Đường, Phường/Xã, Tỉnh/Thành phố'
						width='medium'
					/>

					<TextInput
						name='Phone'
						label='Số điện thoại'
						placeholder='Nhập số điện thoại.'
						width='medium'
					/>

					<TextInput
						name='Email'
						label='Email'
						placeholder='Nhập địa chỉ email.'
						width='medium'
					/>

					<TextInput
						name='ExperienceYears'
						label='Số năm kinh nghiệm'
						placeholder='Nhập số năm kinh nghiệm.'
						width='medium'
					/>

					<TextInput
						name='AppliedPosition'
						label='Vị trí ứng tuyển'
						placeholder='Nhập vị trí ứng tuyển.'
						width='medium'
					/>

					{/* <TextInput
						name='AppliedDate'
						label='Số điện thoại'
						placeholder='Nhập số điện thoại.'
						width='medium'
					/> */}

					<TextInput
						name='AskingSalary'
						label='Mức lương đề nghị'
						placeholder='Nhập mức lương đề nghị.'
						width='medium'
					/>

					<Button type='submit' width='medium'>
						Thêm
					</Button>
					<Button
						type='button'
						secondary
						width='medium'
						onClick={() => console.log(methods.getValues())}
					>
						Thoát
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
