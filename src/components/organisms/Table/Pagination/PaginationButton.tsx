import { ArrowSmallIcon } from '../../../../assets/icons/ArrowSmallIcon';

interface PaginationButtonProps extends React.ComponentPropsWithRef<'button'> {
	content: number | 'prev' | 'next';
	active?: boolean;
	disabled?: boolean;
}

export const PaginationButton = ({
	content,
	active,
	disabled,
	onClick,
}: PaginationButtonProps) => {
	return (
		<button
			className={
				' flex h-8 w-8 items-center justify-center rounded border-2 text-neutral-gray-9 ' +
				` ${
					disabled
						? ' cursor-not-allowed border-neutral-gray-6 bg-neutral-gray-4 '
						: ` border-secondary-dark-1 ${
								active
									? ' cursor-auto bg-secondary-bright-2 '
									: ' cursor-pointer bg-neutral-gray-1 hover:bg-secondary-bright-3 active:bg-secondary-bright-2 '
						  }`
				} `
			}
			onClick={(event) => {
				if (disabled || active) {
					return;
				}
				onClick && onClick(event);
			}}
		>
			{typeof content === 'number' ? (
				content
			) : (
				<ArrowSmallIcon
					direction={content === 'next' ? 'right' : 'left'}
					size={32}
				/>
			)}
		</button>
	);
};
