import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../../../app/App';
import { useToastStore } from '../../../../app/App.store';
import { Button } from '../../../../components/atoms/Button/Button';
import { DateInput } from '../../../../components/atoms/Input/DateTimeInput/DateInput';
import { SelectInput } from '../../../../components/atoms/Input/SelectInput';
import { TextInput } from '../../../../components/atoms/Input/TextInput';
import { Position } from '../../Position.interface';
import { usePositionStore } from '../../Position.store';
import {
	UpdatePositionFormIntermediateValues,
	updatePositionFormSchema,
} from './UpdatePositionForm.form';

export const UpdatePositionForm = () => {
	const navigate = useNavigate();

	const selectedPosition = usePositionStore(
		(state) => state.selectedPosition
	) as Position;

	const queryClient = useQueryClient();
	const mutation = useMutation(
		'positions/update',
		async (formData: Position) => {
			const res = await fetch(
				`${BASE_URL}/Positions/Update?Name=${selectedPosition.Name}`,
				{
					headers: {
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
				queryClient.invalidateQueries('position');
			},
		}
	);

	const showToast = useToastStore((state) => state.showToast);

	const methods = useForm<UpdatePositionFormIntermediateValues>({
		mode: 'onSubmit',
		defaultValues: {
			Name: selectedPosition.Name,
		},
		resolver: zodResolver(updatePositionFormSchema),
	});

	const displayConfigs = usePositionStore((state) => state.displayConfigs);

	const handleSubmit: SubmitHandler<UpdatePositionFormIntermediateValues> = (
		rawData
	) => {
		console.log(rawData);

		const formData: Position = {
			Name: rawData.Name,
			ApplicantCount: selectedPosition.ApplicantCount,
			EmployeeCount: selectedPosition.EmployeeCount,
		};

		// console.log({ formData });
		mutation.mutate(formData);
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
						name='Name'
						placeholder='Nhập 9 hoặc 12 số.'
						width='medium'
						displayConfigs={displayConfigs}
					/>

					<Button type='submit' width='medium'>
						Thêm
					</Button>
					<Button
						type='button'
						width='medium'
						onClick={() => console.log('getValues', methods.getValues())}
					>
						Xem form
					</Button>
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
