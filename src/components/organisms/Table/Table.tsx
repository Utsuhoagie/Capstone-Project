import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnDef,
} from '@tanstack/react-table';
import {
	mapValueToDisplay,
	MAPPING,
	mapHeaderToDisplay,
} from '../../../app/App.mapping';
import { TableProps } from './Table.interface';

export const Table = ({
	module,
	data,
	tableConfig,
	columnConfigs,
}: TableProps) => {
	// Column configs
	const fields = Object.keys(data[0]);
	const helper = createColumnHelper<any>();
	const columns = fields.map((field: string) =>
		helper.accessor(
			(singleObject) => singleObject[field as keyof typeof singleObject],
			{
				id: field,
				header: () => mapHeaderToDisplay({ module, field }),
				cell: (ctx) => {
					const { displayType, formatter } = columnConfigs[field] ?? {};
					// return formatter ? formatter(ctx.getValue()) : ctx.getValue();
					const value = ctx.getValue();

					switch (displayType) {
						case 'formatted':
							return formatter && formatter(value); // NOTE: should always be true
						case 'mapped':
							return mapValueToDisplay({ module, field, value });
						case 'none':
							return value;
					}
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
		<div className='overflow-clip rounded-md border-2 border-primary-bright-1'>
			<table className='bg-neutral-white' style={{ width: tableConfig?.width }}>
				<thead>
					<tr>
						{table.getFlatHeaders().map((header) => {
							const columnConfig = columnConfigs[header.id];
							return (
								<th
									key={header.id}
									className={
										' border-x border-neutral-gray-5 bg-primary-bright-4 px-1 py-1 text-left ' +
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
					{table.getRowModel().rows.map((row) => {
						return (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => {
									const columnConfig = columnConfigs[cell.id];
									return (
										<td
											key={cell.id}
											className={
												' border-x border-t border-neutral-gray-5 px-1 py-1 text-left ' +
												' first:border-l-0 ' +
												' last:border-r-0 '
											}
											style={{ width: columnConfig?.width ?? undefined }}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
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
