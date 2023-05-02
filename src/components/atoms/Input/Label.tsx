interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
	label?: string;
	required?: boolean;
	isForList?: boolean;
}

export const Label = ({ label, required, isForList }: LabelProps) => {
	return (
		<p
			className={
				' flex h-h-input flex-row items-center whitespace-normal break-words text-body text-neutral-gray-9 ' +
				` ${isForList ? ' w-60 ' : ' w-40 '} ` +
				`${
					required ? ' after:text-state-error-normal after:content-["*"] ' : ''
				}`
			}
		>
			{label ?? 'DefaultLabel'}
		</p>
	);
};
