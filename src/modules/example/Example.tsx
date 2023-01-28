import { useState } from 'react';
import { Button } from '../../components/atoms/Button/Button';
import { TextInput } from '../../components/atoms/Input/TextInput';
import { Tag } from '../../components/atoms/Tag/Tag';

export const Example = () => {
	const [index, setIndex] = useState<number>(0);
	const widths = ['full', 'small', 'medium', 'big'] as const;

	return (
		<div className='flex flex-col gap-14 pt-20'>
			<p>Example</p>

			{/* Button test */}
			<div className='flex flex-col'>
				{widths[index]}
				<Button
					secondary
					width={widths[index]}
					onClick={() => {
						setIndex((index) => (index + 1) % 4);
					}}
				>
					Click
				</Button>
			</div>

			<Tag canClose={true} onClick={() => window.alert('aaaaaaa')}>
				Toàn thời gian
			</Tag>
		</div>
	);
};
