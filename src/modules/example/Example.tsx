import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useDialogStore, useToastStore } from '../../app/App.store';
import { ArrowBigIcon } from '../../assets/icons/ArrowBigIcon';
import { Button } from '../../components/atoms/Button/Button';
import { TextInput } from '../../components/atoms/Input/TextInput';
import { Tag } from '../../components/atoms/Tag/Tag';
import { API } from '../../config/axios/axios.config';
import { ExampleForm } from './ExampleForm';
import QueryString from 'query-string';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const Example = () => {
	const openDialog = useDialogStore((state) => state.openDialog);
	const showToast = useToastStore((state) => state.showToast);

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const params = {
			date: dayjs('2023-04-20T20:29:56Z').format('DD-MM-YYYY'),
			dateTimeOffset: dayjs('2023-04-20T20:29:56Z').format('DD-MM-YYYY'),
		};
		// window.alert(
		// 	JSON.stringify({
		// 		...params,
		// 		dayjs: dayjs('2023-04-20T20:29:56Z').toDate(),
		// 	})
		// );
		setSearchParams(QueryString.stringify(params));
	}, []);

	const queryParams = QueryString.parse(searchParams.toString());
	const testDateMutation = useMutation('TestDate', async () => {
		console.log(queryParams);
		const params = QueryString.stringify({
			date: dayjs(queryParams.date as any, 'DD-MM-YYYY').toISOString(),
			dateOffset: dayjs(
				queryParams.dateOffset as any,
				'DD-MM-YYYY'
			).toISOString(),
		});
		const res = await API.get(`Attendances/TestDate?${params}`);
		const data = res.data;
		return data;
	});

	const [index, setIndex] = useState<number>(0);
	const widths = ['full', 'small', 'medium', 'big'] as const;

	return (
		<div className='flex flex-col gap-14 pt-20'>
			<p>Example</p>

			<div className='flex flex-col'>
				{widths[index]}
				<Button
					variant='secondary'
					width={widths[index]}
					onClick={() => {
						setIndex((index) => (index + 1) % 4);
					}}
				>
					Clickf
				</Button>

				<Button
					width='medium'
					onClick={() => {
						testDateMutation.mutate();
					}}
				>
					Test Date
				</Button>

				<Button
					width='medium'
					onClick={() => {
						console.log('clicked');
						openDialog({
							isClosable: true,
							content: (
								<div className='h-3/4 w-3/4'>
									{/* <ExampleForm /> */}
									<p className='h-[600px] w-[800px]'>dadasdas</p>
								</div>
							),
						});
					}}
				>
					Open Dialog
				</Button>
			</div>

			<Tag canClose={true} onClick={() => window.alert('aaaaaaa')}>
				Toàn thời gian
			</Tag>

			<Button width='small' onClick={() => showToast({ state: 'error' })}>
				Show Toast
			</Button>

			<div>
				<ArrowBigIcon size={32} direction='down' />
			</div>
		</div>
	);
};
