export const EmptyText = ({ canHover }: { canHover?: boolean }) => {
	return (
		<p
			className={`italic text-neutral-gray-6 ${
				canHover && 'group-hover:text-neutral-gray-1 '
			}`}
		>
			Không có
		</p>
	);
};
