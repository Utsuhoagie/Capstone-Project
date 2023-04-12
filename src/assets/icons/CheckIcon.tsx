import React from 'react';
import { IconProps } from './_Icon.interface';

export const CheckIcon = ({ size, className, ...props }: IconProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 24 24'
			{...props}
			className={className}
		>
			<g clipPath='url(#clip0_502_12683)'>
				<path d='M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z' />
			</g>
			<defs>
				<clipPath id='clip0_502_12683'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
