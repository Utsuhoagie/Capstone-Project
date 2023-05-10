import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import QueryString from 'query-string';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
	DisplayConfigs,
	getDisplayForFieldValue,
	getLabelForField,
} from '../../../app/App.display';
import { ArrowBigIcon } from '../../../assets/icons/ArrowBigIcon';
import { DropdownIcon } from '../../../assets/icons/DropdownIcon';
import { EmptyText } from '../../atoms/EmptyText/EmptyText';
import { Pagination } from './Pagination/Pagination';
import { ColumnConfigs, TableConfig } from './Table.interface';
import { useTableStore } from './Table.store';

export interface TableProps {
	data: any[];
	displayConfigs: DisplayConfigs;
	tableConfig: TableConfig;
	columnConfigs: ColumnConfigs;
}

export const Table = ({
	data,
	displayConfigs,
	tableConfig,
	columnConfigs,
}: TableProps) => {
	// Row state management
	const { selectedRowIndex, setSelectedRowIndex, pagination, setPagination } =
		useTableStore();
	const firstIndexWithoutData = data.findIndex((row) => row === undefined);

	// Search params
	const [searchParams, setSearchParams] = useSearchParams();

	// Display configs
	const { labellers } = displayConfigs;

	// Column configs
	const fields = Object.keys(columnConfigs);
	const helper = createColumnHelper<any>();
	const columns = fields.map((field: string) =>
		helper.accessor(
			(singleObject) => {
				if (singleObject === undefined) {
					return undefined;
				}
				return singleObject[field as keyof typeof singleObject];
			},
			{
				id: field,
				header: () => getLabelForField({ labellers, field }),
				cell: (ctx) => {
					const value = ctx.getValue();

					if (value === undefined) {
						return undefined;
					}

					return getDisplayForFieldValue({ displayConfigs, field, value });
				},
				sortUndefined: 1,
			}
		)
	);

	// Table config
	const table = useReactTable({
		data: data,
		columns: columns,
		// state: {
		// 	sorting: sortingState,
		// },
		// onSortingChange: setSortingState,
		getCoreRowModel: getCoreRowModel(),
		// getSortedRowModel: getSortedRowModel(),
		// debugAll: true,
	});

	useEffect(() => {
		setSelectedRowIndex(undefined);
	}, [searchParams /* , sortingState */]);

	return (
		<div>
			<div
				className='overflow-x-auto overflow-y-clip rounded border-2 border-semantic-section-border shadow-md'
				style={{ width: tableConfig.width }}
			>
				<table className='table-fixed bg-neutral-white'>
					<thead>
						<tr className='flex flex-row bg-primary-dark-1'>
							{table.getFlatHeaders().map((header) => {
								const field = header.id;
								const columnConfig = columnConfigs[field];

								const currentParams = QueryString.parse(
									searchParams.toString()
								);

								const currentSortDirection = currentParams.SortDirection;
								const currentSortByField = currentParams.SortByField;

								const isSortable = columnConfig.isSortable;
								// ? header.column.getIsSorted()

								return (
									<th
										key={field}
										className={
											' relative flex flex-col justify-center border-x border-neutral-gray-5 px-1.5 py-1 text-left font-medium text-neutral-gray-1 ' +
											' first:border-l-0 ' +
											' last:border-r-0 ' +
											` ${
												isSortable
													? ' cursor-pointer hover:bg-secondary-dark-1 '
													: ''
											} `
										}
										style={{ width: columnConfig?.width ?? undefined }}
										onClick={
											isSortable
												? // ? header.column.getToggleSortingHandler()
												  () => {
														const newSortDirection =
															currentSortDirection === undefined
																? 1
																: currentSortDirection === '1'
																? -1
																: undefined;
														const newSortByField =
															newSortDirection === undefined
																? undefined
																: field;

														const newParams = {
															...currentParams,
															SortDirection: newSortDirection,
															SortByField: newSortByField,
														};

														setSearchParams(QueryString.stringify(newParams));
												  }
												: undefined
										}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
										{isSortable &&
											currentSortDirection &&
											currentSortByField === field && (
												<div className='absolute right-1'>
													<ArrowBigIcon
														size={16}
														direction={
															currentSortDirection === '1' ? 'up' : 'down'
														}
													/>
												</div>
											)}
									</th>
								);
							})}
						</tr>
					</thead>

					<tbody>
						{table.getRowModel().rows.map((row, rowIndex) => {
							const isRowSelected = selectedRowIndex === rowIndex;
							const isRowWithData =
								firstIndexWithoutData !== -1
									? rowIndex < firstIndexWithoutData
									: true;

							return (
								<tr
									key={row.id}
									className={
										isRowWithData
											? ' group flex cursor-pointer flex-row ' +
											  ' hover:bg-accent-bright-1' /*  hover:text-neutral-gray-1 ' + */ +
											  (isRowSelected
													? ' bg-accent-bright-1 ' /* ' text-neutral-gray-1 ' */
													: ' odd:bg-primary-bright-6 ')
											: ' flex flex-row odd:bg-primary-bright-6 '
									}
									onClick={() => {
										isRowWithData
											? setSelectedRowIndex(
													isRowSelected ? undefined : rowIndex
											  )
											: undefined;
									}}
								>
									{row.getVisibleCells().map((cell) => {
										const columnConfig = columnConfigs[cell.column.id];

										const value = cell.getContext().getValue();
										const isValueUndefined = value === undefined;

										return (
											<td
												key={cell.id}
												className={
													' overflow-hidden text-ellipsis whitespace-nowrap border-x border-t border-neutral-gray-5 px-1.5 py-1 text-left ' +
													' first:border-l-0 ' +
													' last:border-r-0 '
												}
												style={{ width: columnConfig?.width ?? undefined }}
											>
												{isValueUndefined ? (
													isRowWithData ? (
														<EmptyText canHover isHovered={isRowSelected} />
													) : (
														<span className='select-none whitespace-pre'>
															{' '}
														</span>
													)
												) : (
													flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<Pagination />
		</div>
	);
};
