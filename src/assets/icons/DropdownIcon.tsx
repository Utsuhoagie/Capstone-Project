import { IconProps } from './_Icon.interface';

export const DropdownIcon = ({ size, ...props }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<g clipPath='url(#clip0_344_12697)'>
				<path d='M7 10L12 15L17 10H7Z' fill='black' />
			</g>
			<defs>
				<clipPath id='clip0_344_12697'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
