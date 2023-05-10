import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IS_DEBUG_MODE } from '../../../../../app/App';
import { ServiceResult } from '../../../../../app/App.interface';
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
import {
	mapToPosition,
	Position,
	Position_API_Response,
} from '../../Position.interface';
import { usePositionStore } from '../../Position.store';
import {
	UpdatePositionFormIntermediateValues,
	updatePositionFormSchema,
} from './UpdatePositionForm.form';

export const UpdatePositionForm = () => {
	const navigate = useNavigate();
	const { accessToken } = useAuthStore();
	const { Name } = useParams();
	const { displayConfigs } = usePositionStore();
	const { showToast } = useToastStore();
	const { openConfirmDialog } = useConfirmDialogStore();

	const queryClient = useQueryClient();
	// Query position, to send back UNCHANGED Applicant/Employee counts
	const { data: selectedPosition } = useQuery(
		['positions', { Name }],
		async () => {
			const res = await API.get(`Positions/${Name}`);

			if (res.status >= 400) {
				return undefined;
			}

			const data: Position_API_Response = res.data;

			return mapToPosition(data);
		}
	);
	const mutation = useMutation(
		'positions/update',
		async (formData: Position) => {
			try {
				const res = await API.put(`Positions/Update/${Name}`, formData);

				showToast({ state: 'success' });
			} catch (error) {
				showToast({
					state: 'error',
					message: (error as ServiceResult).ErrorMessage,
				});
			}
		},
		{
			onSuccess: () => {
				console.log('invalidated');
				queryClient.invalidateQueries('positions');
			},
		}
	);

	const methods = useForm<UpdatePositionFormIntermediateValues>({
		mode: 'onSubmit',
		defaultValues: {
			Name: Name,
		},
		resolver: zodResolver(updatePositionFormSchema),
	});

	const handleSubmit: SubmitHandler<UpdatePositionFormIntermediateValues> = (
		rawData
	) => {
		console.log(rawData);

		const formData: Position = {
			Name: rawData.Name,
			ApplicantCount: selectedPosition ? selectedPosition.ApplicantCount : 0,
			EmployeeCount: selectedPosition ? selectedPosition.EmployeeCount : 0,
		};

		// console.log({ formData });
		openConfirmDialog({
			isClosable: true,
			// title,
			message: 'Xác nhận cập nhật vị trí này?',
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
		console.log({ error });
	};

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Chỉnh sửa Vị trí</h1>
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
							onClick={() => console.log('getValues', methods.getValues())}
						>
							Xem form
						</Button>
					)}
					<Button
						type='button'
						variant='secondary'
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
