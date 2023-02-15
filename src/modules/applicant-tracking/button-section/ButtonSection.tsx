import { Button } from '../../../components/atoms/Button/Button';
import { useTableStore } from '../../../components/organisms/Table/Table.store';

export const ButtonSection = () => {
	const selectedRowIndex = useTableStore((state) => state.selectedRowIndex);

	if (selectedRowIndex === undefined) return null;

	return (
		<div className='flex w-fit flex-col items-center rounded border border-secondary-dark-1 p-2 shadow-md'>
			<Button width='big'>Some text</Button>
		</div>
	);
};
