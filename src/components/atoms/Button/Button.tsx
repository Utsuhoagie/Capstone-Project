import { buttonMapping } from './ButtonMapping';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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
		buttonMapping.all +
		(secondary ? buttonMapping.secondary : buttonMapping.primary) +
		buttonMapping[width].width;

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
