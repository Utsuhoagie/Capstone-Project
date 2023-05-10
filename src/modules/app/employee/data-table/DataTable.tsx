import { Table } from '../../../../components/organisms/Table/Table';
import {
	EMPLOYEE_TABLE_CONFIGS,
	EMPLOYEE_COLUMN_CONFIGS,
} from './DataTable.config';
import { useEmployeeStore } from '../Employee.store';
import { omit } from 'ramda';
import { Button } from '../../../../components/atoms/Button/Button';
import { useNavigate } from 'react-router';
import { useDialogStore } from '../../../../app/App.store';
import { FilterDialog } from './filter-dialog/FilterDialog';
import { useSearchParams } from 'react-router-dom';
import QueryString from 'query-string';

export const DataTable = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const paramsWithoutPagination = omit(
		['page', 'pageSize'],
		QueryString.parse(searchParams.toString())
	);
	const hasFiltersOrSorts = Object.keys(paramsWithoutPagination).length > 0;

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

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-row items-center gap-4'>
				<Button width='small' onClick={() => navigate('create')}>
					Thêm
				</Button>
				<Button
					variant='secondary'
					width='small'
					onClick={() =>
						openDialog({
							isClosable: true,
							title: 'Bộ lọc',
							content: <FilterDialog />,
						})
					}
				>
					Bộ Lọc
				</Button>
				{hasFiltersOrSorts ? (
					<p
						className='cursor-pointer text-state-error-normal underline'
						onClick={() => setSearchParams()}
					>
						Xóa bộ lọc
					</p>
				) : undefined}
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
