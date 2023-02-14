interface HeadingProps {
	text: string;
	icon?: any;
}

export const Heading = ({ text }: HeadingProps) => {
	return (
		<div className=''>
			<h3 className='text-h3 font-medium text-secondary-dark'>{text}</h3>
		</div>
	);
};
