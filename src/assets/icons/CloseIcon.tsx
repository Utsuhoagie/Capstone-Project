import { IconProps } from './_Icon.interface';

export const CloseIcon = ({ size, ...props }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			{...props}
			className={`fill-neutral-gray-9 ${props.className}`}
		>
			<g clipPath='url(#clip0_87_40363)'>
				<path d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z' />
			</g>
			<defs>
				<clipPath id='clip0_87_40363'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
