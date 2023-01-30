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
		<li className='w-full cursor-pointer border-t border-primary-normal bg-primary-dark-1 last-of-type:border-b hover:bg-primary-bright-2'>
			<button
				className='w-full p-2 text-left text-neutral-gray-1'
				onClick={handleClick}
			>
				{children}
			</button>
		</li>
	);
};
