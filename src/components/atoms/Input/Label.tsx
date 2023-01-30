interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
	label?: string;
	required?: boolean;
}

export const Label = ({ label, required }: LabelProps) => {
	return (
		<p
			className={
				' w-40 whitespace-normal break-words text-body text-neutral-gray-9 ' +
				`${required && ' after:text-state-error after:content-["*"] '}`
			}
		>
			{label ?? 'DefaultLabel'}
		</p>
	);
};
