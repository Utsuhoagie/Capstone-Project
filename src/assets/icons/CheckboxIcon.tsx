import { IconProps } from './_Icon.interface';

interface CheckboxIconProps extends IconProps {
	checked?: boolean;
}

export const CheckboxIcon = ({
	size,
	checked,
	...props
}: CheckboxIconProps) => {
	return checked ? (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			className='fill-primary-dark-1'
			{...props}
		>
			<g clipPath='url(#clip0_345_12703)'>
				<path d='M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z' />
			</g>
			<defs>
				<clipPath id='clip0_345_12703'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	) : (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			className='fill-primary-dark-1'
			{...props}
		>
			<g clipPath='url(#clip0_345_12700)'>
				<path d='M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z' />
			</g>
			<defs>
				<clipPath id='clip0_345_12700'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
