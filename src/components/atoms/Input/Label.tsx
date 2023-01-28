interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
	label?: string;
}

export const Label = ({ label }: LabelProps) => {
	return (
		<p className='w-40 whitespace-normal break-words text-body text-neutral-gray-9'>
			{label ?? 'DefaultLabel'}
		</p>
	);
};
