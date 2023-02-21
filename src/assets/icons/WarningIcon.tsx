import { IconProps } from './_Icon.interface';

export const WarningIcon = ({ size, ...props }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			className='fill-state-warning-normal'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_303_12687)'>
				<path d='M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z' />
			</g>
			<defs>
				<clipPath id='clip0_303_12687'>
					<rect width='24' height='24' />
				</clipPath>
			</defs>
		</svg>
	);
};
