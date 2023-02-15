import { buttonStyleMapping } from './ButtonStyleMapping';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	children: React.ReactNode;
	width: 'full' | 'small' | 'medium' | 'big';
	secondary?: boolean;
	ref?: React.RefObject<HTMLButtonElement>;
}

export const Button = ({
	children,
	width,
	secondary,
	...props
}: ButtonProps) => {
	const classes =
		buttonStyleMapping.all +
		(secondary ? buttonStyleMapping.secondary : buttonStyleMapping.primary) +
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
