interface EmptyTextProps {
	canHover?: boolean;
	isHovered?: boolean;
}

export const EmptyText = ({ canHover, isHovered }: EmptyTextProps) => {
	return (
		<p
			className={` italic 
			${
				isHovered
					? ' text-neutral-gray-6 ' /* ' text-neutral-gray-1 ' */
					: ' text-neutral-gray-6 '
			} 
			${canHover ? '' /* ' group-hover:text-neutral-gray-1 ' */ : ''}`}
		>
			Không có
		</p>
	);
};
