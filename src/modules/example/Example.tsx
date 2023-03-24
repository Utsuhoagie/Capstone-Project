import { useState } from 'react';
import { useDialogStore, useToastStore } from '../../app/App.store';
import { ArrowBigIcon } from '../../assets/icons/ArrowBigIcon';
import { Button } from '../../components/atoms/Button/Button';
import { TextInput } from '../../components/atoms/Input/TextInput';
import { Tag } from '../../components/atoms/Tag/Tag';
import { ExampleForm } from './ExampleForm';

export const Example = () => {
	const openDialog = useDialogStore((state) => state.openDialog);
	const showToast = useToastStore((state) => state.showToast);

	const [index, setIndex] = useState<number>(0);
	const widths = ['full', 'small', 'medium', 'big'] as const;

	return (
		<div className='flex flex-col gap-14 pt-20'>
			<p>Example</p>

			<div className='flex flex-col'>
				{widths[index]}
				<Button
					secondary
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
