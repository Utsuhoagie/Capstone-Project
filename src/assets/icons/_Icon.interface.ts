export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
	size: 16 | 24 | 32 | 40;
	disabled?: boolean;
}

type Direction = 'up' | 'down' | 'left' | 'right';

export interface DirectionalIconProps extends IconProps {
	direction: Direction;
}

// Given an icon that points DOWN
export function getTailwindRotateClassFromDirection(direction: Direction) {
	switch (direction) {
		case 'up':
			return 'rotate-180';
		case 'down':
			return '';
		case 'left':
			return 'rotate-90';
		case 'right':
			return '-rotate-90';
	}
}
