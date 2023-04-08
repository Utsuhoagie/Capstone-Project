import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IS_DEBUG_MODE } from '../../../../../app/App';
import {
	useConfirmDialogStore,
	useToastStore,
} from '../../../../../app/App.store';
import { Button } from '../../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../../components/atoms/Input/DateTimeInput/DateInput';
import { SelectInput } from '../../../../../components/atoms/Input/SelectInput/SelectInput';
import { TextInput } from '../../../../../components/atoms/Input/TextInput';
import { API } from '../../../../../config/axios/axios.config';
import { useAuthStore } from '../../../../auth/Auth.store';
import { Position } from '../../Position.interface';
import { usePositionStore } from '../../Position.store';
import {
	CreatePositionFormIntermediateValues,
	createPositionFormSchema,
} from './CreatePositionForm.form';

export const CreatePositionForm = () => {
	const navigate = useNavigate();

	const { accessToken } = useAuthStore();
	const { displayConfigs } = usePositionStore();
	const { openConfirmDialog } = useConfirmDialogStore();
	const { showToast } = useToastStore();

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'positions/create',
		async (formData: Position) => {
			const res = await API.post('Positions/Create', formData);

			if (res.status <= 299) {
				showToast({ state: 'success' });
			} else {
				showToast({ state: 'error' });
			}
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('positions');
			},
		}
	);

	const methods = useForm<CreatePositionFormIntermediateValues>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: {
			Name: '',
		},
		resolver: zodResolver(createPositionFormSchema),
	});

	const handleSubmit: SubmitHandler<CreatePositionFormIntermediateValues> = (
		rawData
	) => {
		console.log(rawData);

		const formData: Position = {
			Name: rawData.Name,
			ApplicantCount: 0,
			EmployeeCount: 0,
		};

		// console.log({ formData });
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận tạo vị trí?',
			onConfirm: () => {
				mutation.mutate(formData);
				navigate('/app/positions');
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
			<h1 className='text-h1'>Thêm Vị trí mới</h1>
			<FormProvider {...methods}>
				<form
					className='flex flex-col gap-2 p-2'
					onSubmit={methods.handleSubmit(handleSubmit, handleError)}
				>
					<TextInput
						required
						name='Name'
						placeholder='Nhập tên vị trí.'
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
							onClick={() => console.log(methods.getValues())}
						>
							Xem form
						</Button>
					)}
					<Button
						type='button'
						secondary
						width='medium'
						onClick={() => navigate('/app/positions')}
					>
						Thoát
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
