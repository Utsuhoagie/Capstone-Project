import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowSmallIcon } from '../../../../assets/icons/ArrowSmallIcon';
import { useTableStore } from '../Table.store';

interface PaginationInputButtonProps
	extends React.ComponentPropsWithRef<'input'> {}

export const PaginationInputButton = ({
	placeholder,
}: PaginationInputButtonProps) => {
	const pagination = useTableStore((state) => state.pagination);
	const [_, setSearchParams] = useSearchParams();
	const [pageInput, setPageInput] = useState<string>('');

	function handleChangePageInput(event: React.ChangeEvent<HTMLInputElement>) {
		const text = event.target.value;
		setPageInput(text);
		console.log('input = ', text);
	}

	function handleDetectEnter(event: React.KeyboardEvent<HTMLInputElement>) {
		const key = event.key;

		if (key === 'Enter') {
			const parsedPageInput = parseInt(pageInput);
			const pageIndex =
				Number.isNaN(parsedPageInput) ||
				parsedPageInput < 1 ||
				parsedPageInput > pagination.TotalPages
					? 1
					: parsedPageInput;
			setSearchParams({ page: `${pageIndex}` });
			setPageInput('');
		}
	}

	return (
		<input
			className={
				' bg-secondary-bright-4 flex h-8 w-32 items-center justify-center rounded border-2 border-secondary-dark-1 py-1 px-2 text-neutral-gray-9 ' +
				' outline-secondary-dark-3 '
			}
			placeholder={placeholder}
			value={pageInput}
			onChange={handleChangePageInput}
			onKeyDown={handleDetectEnter}
		/>
	);
};
