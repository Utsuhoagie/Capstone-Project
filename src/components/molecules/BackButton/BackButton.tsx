import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowSmallIcon } from '../../../assets/icons/ArrowSmallIcon';

interface BackButtonProps {
	to: string;
	label: string;
}

export const BackButton = ({ to, label }: BackButtonProps) => {
	const navigate = useNavigate();
	return (
		<div
			className='flex w-fit cursor-pointer flex-row items-center gap-2 rounded border border-primary-normal bg-primary-bright-7 p-2 shadow hover:bg-primary-bright-5 hover:shadow-lg'
			onClick={() => navigate(to)}
		>
			<ArrowSmallIcon
				size={24}
				direction='left'
				className='fill-neutral-black'
			/>
			<p className='text-h4'>{label}</p>
		</div>
	);
};
