import React from 'react';

interface NavItemProps {
	children: React.ReactNode;
	onClick?: () => void;
}

export const NavItem = ({ children, onClick }: NavItemProps) => {
	function handleClick() {
		onClick && onClick();
	}

	return (
		<li
			className={
				' w-full cursor-pointer border-t border-secondary-dark-2 bg-secondary-dark-3 last-of-type:border-b ' +
				' hover:bg-secondary-dark-1 '
			}
		>
			<button
				className='w-full p-2 text-left text-neutral-gray-1'
				onClick={handleClick}
			>
				{children}
			</button>
		</li>
	);
};
