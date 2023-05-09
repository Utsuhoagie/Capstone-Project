import { useTableStore } from '../../../../components/organisms/Table/Table.store';
import { DeleteButton } from './DeleteButton';
import { UpdateButton } from './UpdateButton';
import { ViewLeavesButton } from './ViewLeavesButton';

export const ButtonSection = () => {
	const selectedRowIndex = useTableStore((state) => state.selectedRowIndex);

	return (
		<div
			className={
				' flex w-fit flex-col items-center gap-2 rounded border border-secondary-dark-1 p-4 shadow-md ' +
				`${selectedRowIndex !== undefined ? '' : ' hidden '}`
			}
		>
			<ViewLeavesButton />
			<UpdateButton />
			<DeleteButton />
		</div>
	);
};
