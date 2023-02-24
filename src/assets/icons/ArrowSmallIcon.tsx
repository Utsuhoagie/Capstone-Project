import { IconProps } from './_Icon.interface';

interface ArrowSmallIconProps extends IconProps {
	direction: 'left' | 'right';
}

// Default direction is DOWN
export const ArrowSmallIcon = ({ size, direction }: ArrowSmallIconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			className={direction === 'left' ? 'rotate-90' : '-rotate-90'}
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_406_12677)'>
				<path
					d='M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z'
					fill='black'
				/>
			</g>
			<defs>
				<clipPath id='clip0_406_12677'>
					<rect width={size} height={size} fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
