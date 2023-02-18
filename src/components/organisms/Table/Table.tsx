import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	DisplayConfigs,
	getDisplayForFieldValue,
	getLabelForField,
} from '../../../app/App.display';
import { EmptyText } from '../../atoms/EmptyText/EmptyText';
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
	const selectedRowIndex = useTableStore((state) => state.selectedRowIndex);
	const setSelectedRowIndex = useTableStore(
		(state) => state.setSelectedRowIndex
	);
	const firstIndexWithoutData = data.findIndex((row) => row === undefined);

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
			}
		)
	);

	// Table config
	const table = useReactTable({
		data: data,
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
		// debugAll: true,
	});

	return (
		<div
			className='overflow-x-auto overflow-y-clip rounded border-2 border-semantic-section-border shadow-md'
			style={{ width: tableConfig.width }}
		>
			<table className='table-fixed bg-neutral-white'>
				<thead>
					<tr className='flex flex-row bg-primary-dark-1'>
						{table.getFlatHeaders().map((header) => {
							const columnConfig = columnConfigs[header.id];

							return (
								<th
									key={header.id}
									className={
										' flex flex-col justify-center border-x border-neutral-gray-5 px-1.5 py-1 text-left font-medium text-neutral-gray-1 ' +
										' first:border-l-0 ' +
										' last:border-r-0 '
									}
									style={{ width: columnConfig?.width ?? undefined }}
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</th>
							);
						})}
					</tr>
				</thead>

				<tbody>
					{table.getRowModel().rows.map((row, rowIndex) => {
						const isRowSelected = selectedRowIndex === rowIndex;
						const isRowWithData = rowIndex < firstIndexWithoutData;

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
								onClick={() =>
									isRowWithData
										? setSelectedRowIndex(isRowSelected ? undefined : rowIndex)
										: undefined
								}
							>
								{row.getVisibleCells().map((cell) => {
									const columnConfig = columnConfigs[cell.column.id];

									const value = cell.getContext().getValue();
									const isValueUndefined = value === undefined;

									return (
										<td
											key={cell.id}
											className={
												' text-ellipsis whitespace-nowrap border-x border-t border-neutral-gray-5 px-1.5 py-1 text-left ' +
												' first:border-l-0 ' +
												' last:border-r-0 '
											}
											style={{ width: columnConfig?.width ?? undefined }}
										>
											{isValueUndefined ? (
												isRowWithData ? (
													<EmptyText canHover isHovered={isRowSelected} />
												) : (
													<span className='select-none whitespace-pre'> </span>
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
	);
};
