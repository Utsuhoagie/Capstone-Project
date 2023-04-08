import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/atoms/Button/Button';
import { TextInput } from '../../../components/atoms/Input/TextInput';
import { AuthAPI } from '../../../config/axios/axios.config';
import { Auth_API_Response } from '../Auth.interface';
import { useAuthStore } from '../Auth.store';
import {
	RegisterEmployeeFormIntermediateValues,
	registerEmployeeFormSchema,
	RegisterEmployeeModel,
} from './RegisterEmployee.form';

export const RegisterEmployee = () => {
	const navigate = useNavigate();
	const methods = useForm<RegisterEmployeeFormIntermediateValues>({
		defaultValues: {
			Email: '',
			Password: '',
			PasswordConfirm: '',
		},
		resolver: zodResolver(registerEmployeeFormSchema),
	});
	const [error, setError] = useState<string>('');

	const mutation = useMutation(
		'registerEmployee',
		async (formData: RegisterEmployeeModel) => {
			const res = await AuthAPI.post(`RegisterEmployee`, formData);

			const data: Auth_API_Response = res.data;

			if (res.status >= 300) {
				if (data)
					setError(data.Errors.map((error) => error.Description).join('. '));
				else setError('Có lỗi xảy ra.');

				return;
			}

			console.table(data);

			window.alert('Đăng kí thành công');
			navigate('/auth/Login');
		}
	);

	function handleLogin(data) {
		console.table(data);
		setError('');
		mutation.mutate(data);
	}

	function handleError(error) {
		console.table(error);
	}

	return (
		<FormProvider {...methods}>
			<form
				className='flex flex-col items-stretch'
				onSubmit={methods.handleSubmit(handleLogin, handleError)}
			>
				<h2 className='bg-primary-dark-1 py-2 text-center text-h2 text-neutral-gray-1'>
					Đăng kí nhân viên
				</h2>

				<div className='flex flex-col items-stretch px-8'>
					<TextInput isVertical name='Email' label='Email' width='full' />
					<TextInput
						isVertical
						name='Password'
						label='Mật khẩu'
						type='password'
						width='full'
					/>
					<TextInput
						isVertical
						name='PasswordConfirm'
						label='Nhập lại mật khẩu'
						type='password'
						width='full'
					/>

					<p className='mt-4 min-h-[20px] self-center text-body text-state-error-normal'>
						{error}
					</p>

					<Button className='my-4 self-center' type='submit' width='medium'>
						Đăng kí
					</Button>

					<Link
						className='mb-4 text-center text-body text-primary-dark-2 underline'
						to='/auth/login'
					>
						Đã có tài khoản? Đăng nhập.
					</Link>
				</div>
			</form>
		</FormProvider>
	);
};
