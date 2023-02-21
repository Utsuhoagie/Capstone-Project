import { useTableStore } from '../../../components/organisms/Table/Table.store';
import { DeleteButton } from './DeleteButton';

export const ButtonSection = () => {
	const selectedRowIndex = useTableStore((state) => state.selectedRowIndex);

	return (
		<div
			className={
				' flex w-fit flex-col items-center rounded border border-secondary-dark-1 p-2 shadow-md ' +
				`${selectedRowIndex !== undefined ? '' : ' hidden '}`
			}
		>
			<DeleteButton />
		</div>
	);
};
