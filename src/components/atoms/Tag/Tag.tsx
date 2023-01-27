import { XIcon } from '../../../assets/icons/XIcon';

interface TagProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	canClose?: boolean;
}

export const Tag = ({ children, canClose, onClick, ...props }: TagProps) => {
	return (
		<button
			className={
				'flex w-fit flex-row items-center justify-center gap-1 rounded-full bg-accent-normal px-1.5 py-1 text-tag text-neutral-gray-7 ' +
				`${
					canClose
						? ' cursor-pointer hover:bg-accent-dark active:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50 '
						: ' cursor-default '
				}`
			}
			onClick={canClose ? onClick : undefined}
			{...props}
		>
			{children}
			{canClose && <XIcon size={16} />}
		</button>
	);
};
