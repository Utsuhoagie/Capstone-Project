import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { BASE_URL } from '../../../app/App';
import { Button } from '../../../components/atoms/Button/Button';
import { TextInput } from '../../../components/atoms/Input/TextInput';
import { Auth_API_Response } from '../Auth.interface';
import { useAuthStore } from '../Auth.store';
import { LoginFormIntermediateValues, LoginModel } from './Login.form';

export const Login = () => {
	const { setTokens } = useAuthStore();
	const methods = useForm<LoginFormIntermediateValues>({
		defaultValues: {
			Email: '',
			Password: '',
		},
	});
	const [error, setError] = useState<string>('');

	const mutation = useMutation('login', async (formData: LoginModel) => {
		const res = await fetch(`${BASE_URL}/Auth/Login`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(formData),
		});

		const data: Auth_API_Response = await res.json();

		if (!res.ok) {
			// console.table(data);
			if (res.status === 404) setError('Có lỗi xảy ra.');
			if (res.status === 401) setError('Email hoặc mật khẩu sai.');
			return;
		}

		console.table(data);
		setTokens(data.AccessToken, data.RefreshToken);
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

					<Button className='mt-4 self-center' type='submit' width='medium'>
						Đăng nhập
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
