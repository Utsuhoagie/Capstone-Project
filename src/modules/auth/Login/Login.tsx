import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button } from '../../../components/atoms/Button/Button';
import { TextInput } from '../../../components/atoms/Input/TextInput';
import { useAuthStore } from '../Auth.store';
import { LoginFormIntermediateValues, LoginModel } from './Login.form';

export const Login = () => {
	const { login, setAccessToken } = useAuthStore();
	const methods = useForm<LoginFormIntermediateValues>({
		defaultValues: {
			Email: '',
			Password: '',
		},
	});
	const [error, setError] = useState<string>('');

	const mutation = useMutation('login', async (formData: LoginModel) => {
		const res = await fetch('https://localhost:5000/api/Auth/Login', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (!res.ok) {
			// console.table(data);
			if (res.status === 404) setError('Có lỗi xảy ra.');
			if (res.status === 401) setError('Email hoặc mật khẩu sai.');
			return;
		}

		console.table(data);
		setAccessToken(data.Token);
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
						label='Password'
						type='password'
						width='full'
					/>
					<Button className='mt-8 self-center' width='medium'>
						Đăng nhập
					</Button>

					<p className='mt-8 self-center text-state-error-normal'>{error}</p>
				</div>
			</form>
		</FormProvider>
	);
};
