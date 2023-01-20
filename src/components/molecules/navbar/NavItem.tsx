import React from 'react';

type NavItemProps = {
	children: React.ReactNode;
	onClick?: () => void;
};

export const NavItem = ({ children, onClick }: NavItemProps) => {
	function handleClick() {
		onClick && onClick();
	}

	return (
		<li className='w-full cursor-pointer border-t border-primary-normal bg-primary-dark2 last-of-type:border-b hover:bg-primary-bright1'>
			<button className='w-full p-2 text-left' onClick={handleClick}>
				{children}
			</button>
		</li>
	);
};
