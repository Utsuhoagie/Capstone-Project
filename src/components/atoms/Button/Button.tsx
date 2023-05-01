import { buttonStyleMapping } from './ButtonStyleMapping';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	children: React.ReactNode;
	width: 'full' | 'small' | 'medium' | 'big';
	variant?: 'primary' | 'secondary' | 'success' | 'error';
	ref?: React.RefObject<HTMLButtonElement>;
}

export const Button = ({
	children,
	width,
	variant,
	className,
	...props
}: ButtonProps) => {
	const classes =
		className +
		buttonStyleMapping.all +
		buttonStyleMapping[variant ?? 'primary'] +
		buttonStyleMapping[width].width;

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
};

// const Thing = () => {
// 	return (
// 		<Button className='rounded opacity-5 shadow shadow-primary-normal'>
// 			aaa
// 		</Button>
// 	);
// };
