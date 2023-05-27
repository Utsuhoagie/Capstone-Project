import {
	DirectionalIconProps,
	getTailwindRotateClassFromDirection,
	IconProps,
} from './_Icon.interface';

// Default direction is DOWN
export const ArrowSmallIcon = ({
	size,
	direction,
	className,
	disabled,
	onClick,
	...props
}: DirectionalIconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 24 24`}
			fill='none'
			className={
				getTailwindRotateClassFromDirection(direction) +
				' ' +
				className +
				(disabled ? ' cursor-not-allowed bg-neutral-gray-4 opacity-50 ' : '')
			}
			xmlns='http://www.w3.org/2000/svg'
			onClick={disabled ? undefined : onClick}
			{...props}
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
