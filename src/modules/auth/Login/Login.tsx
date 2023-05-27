import { zodResolver } from '@hookform/resolvers/zod';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { ServiceResult } from '../../../app/App.interface';
import { useToastStore } from '../../../app/App.store';
import { Button } from '../../../components/atoms/Button/Button';
import { TextInput } from '../../../components/atoms/Input/TextInput';
import { AuthAPI } from '../../../config/axios/axios.config';
import { Auth_API_Response, JWT_Claims } from '../Auth.interface';
import { useAuthStore } from '../Auth.store';
import {
	LoginFormIntermediateValues,
	loginFormSchema,
	LoginModel,
} from './Login.form';

export const Login = () => {
	const { showToast } = useToastStore();
	const { setTokens } = useAuthStore();
	const methods = useForm<LoginFormIntermediateValues>({
		defaultValues: {
			Email: '',
			Password: '',
		},
		resolver: zodResolver(loginFormSchema),
	});
	const [error, setError] = useState<string>('');

	const mutation = useMutation('login', async (formData: LoginModel) => {
		try {
			const res = await AuthAPI.post('Login', formData);

			const data: Auth_API_Response = res.data;

			if (res.status >= 400) {
				console.table(data);
				// if (res.status === 404)
				if (data && data.Errors)
					setError(data.Errors.map((error) => error.Description).join('. '));
				else setError('Có lỗi xảy ra.');
				// if (res.status === 401) setError('Email hoặc mật khẩu sai.');
				return;
			}

			const claims: JWT_Claims = jwtDecode(data.AccessToken);
			if (claims.Role === 'Employee') {
				showToast({
					state: 'error',
					message: 'Hãy đăng nhập bằng tài khoản admin!',
				});
				return;
			}

			console.table(data);
			setTokens(data.AccessToken, data.RefreshToken);
		} catch (error) {
			const Errors = (error as any).response.data.Errors ?? undefined;

			if (Errors) setError(Errors.map((error) => error.Description).join('. '));
			else setError('Có lỗi xảy ra.');
			// if (res.status === 401) setError('Email hoặc mật khẩu sai.');
			return;
		}
	});

	function handleLogin(data) {
		// console.table(data);
		setError('');
		mutation.mutate(data);
	}

	return (
		<FormProvider {...methods}>
			<form
				className='flex flex-col items-stretch'
				onSubmit={methods.handleSubmit(handleLogin)}
			>
				<h2 className='bg-primary-dark-1 py-2 text-center text-h2 text-neutral-gray-1'>
					Đăng nhập
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

					<p className='mt-4 min-h-[20px] self-center text-body text-state-error-normal'>
						{error}
					</p>

					<Button className='my-2 self-center' type='submit' width='medium'>
						Đăng nhập
					</Button>
					{/* <Link
						className='text-center text-body text-primary-dark-2 underline'
						to='/auth/register-employee'
					>
						Là nhân viên mới?
					</Link> */}
				</div>
			</form>
		</FormProvider>
	);
};
