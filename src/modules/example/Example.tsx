import { useState } from 'react';
import { Button } from '../../components/atoms/Button/Button';

export const Example = () => {
	const widths = ['full', 'small', 'medium', 'big'] as const;
	const [index, setIndex] = useState<number>(0);

	return (
		<div className='flex flex-col gap-20 pt-20'>
			Example
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
	);
};
