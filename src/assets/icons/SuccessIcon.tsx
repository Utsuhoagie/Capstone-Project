import { IconProps } from './_Icon.interface';

export const SuccessIcon = ({ size, ...props }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			className='fill-state-success'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M12 1.90918C6.48 1.90918 2 5.98191 2 11.0001C2 16.0183 6.48 20.091 12 20.091C17.52 20.091 22 16.0183 22 11.0001C22 5.98191 17.52 1.90918 12 1.90918ZM10 15.5455L5 11.0001L6.41 9.71827L10 12.9728L17.59 6.07282L19 7.36372L10 15.5455Z' />
		</svg>
	);
};
