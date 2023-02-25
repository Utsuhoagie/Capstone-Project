import {
	DirectionalIconProps,
	getTailwindRotateClassFromDirection,
} from './_Icon.interface';

export const ArrowBigIcon = ({
	size,
	direction,
	className,
}: DirectionalIconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			className={
				getTailwindRotateClassFromDirection(direction) + ' fill-neutral-gray-1 '
			}
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_435_12680)'>
				<path d='M19 15L17.59 13.59L13 18.17V2H11V18.17L6.41 13.58L5 15L12 22L19 15Z' />
			</g>
			<defs>
				<clipPath id='clip0_435_12680'>
					<rect width='40' height='40' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
