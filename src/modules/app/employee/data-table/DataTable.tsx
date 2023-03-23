import { Table } from '../../../components/organisms/Table/Table';
import {
	EMPLOYEE_TABLE_CONFIGS,
	EMPLOYEE_COLUMN_CONFIGS,
} from './DataTable.config';
import { useEmployeeStore } from '../Employee.store';
import { omit } from 'ramda';
import { Button } from '../../../components/atoms/Button/Button';
import { useNavigate } from 'react-router';
import { useDialogStore } from '../../../app/App.store';
import { FilterDialog } from './filter-dialog/FilterDialog';

export const DataTable = () => {
	const navigate = useNavigate();

	const { openDialog } = useDialogStore();

	const { visibleEmployees, displayConfigs } = useEmployeeStore();

	const filledEmployees = [
		...visibleEmployees,
		...new Array(10 - visibleEmployees.length).fill(undefined),
	];

	const subsetColumnConfigs = omit(
		['NationalId', 'Address'],
		EMPLOYEE_COLUMN_CONFIGS
	);

	function handleClickCreate() {
		navigate('create');
	}

	function handleOpenFilterDialog() {
		openDialog({
			isClosable: true,
			title: 'Bộ lọc',
			content: <FilterDialog />,
		});
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-row gap-4'>
				<Button width='small' onClick={handleClickCreate}>
					Thêm
				</Button>
				<Button secondary width='small' onClick={handleOpenFilterDialog}>
					Bộ Lọc
				</Button>
			</div>
			<Table
				data={filledEmployees}
				displayConfigs={displayConfigs}
				tableConfig={EMPLOYEE_TABLE_CONFIGS}
				columnConfigs={subsetColumnConfigs}
			/>
		</div>
	);
};
