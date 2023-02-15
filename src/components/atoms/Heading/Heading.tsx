interface HeadingProps {
	text: string;
	icon?: any;
}

export const Heading = ({ text }: HeadingProps) => {
	return <h3 className='text-h3 font-medium text-secondary-dark-1'>{text}</h3>;
};
