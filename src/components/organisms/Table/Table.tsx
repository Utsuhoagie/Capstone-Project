import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { mapValueToDisplay, MAPPING } from '../../../app/App.mapping';
import { l } from '../../../app/App.utils';
import { EmptyText } from '../../atoms/EmptyText/EmptyText';
import { TableProps } from './Table.interface';

export const Table = ({
	module,
	data,
	tableConfig,
	columnConfigs,
}: TableProps) => {
	// Column configs
	const fields = Object.keys(columnConfigs);
	const helper = createColumnHelper<any>();
	const columns = fields.map((field: string) =>
		helper.accessor(
			(singleObject) => singleObject[field as keyof typeof singleObject],
			{
				id: field,
				header: () => columnConfigs[field].header,
				cell: (ctx) => {
					const { displayType, formatter } = columnConfigs[field] ?? {};
					const value = ctx.getValue();

					if (value === undefined) {
						return <EmptyText />;
					}

					switch (displayType) {
						case 'formatted':
							return formatter && formatter(value); // NOTE: should always be true
						case 'mapped':
							return mapValueToDisplay({ module, field, value });
						case 'normal':
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
		<div
			className='overflow-x-auto overflow-y-clip rounded border-2 border-primary-bright-1'
			style={{ width: tableConfig.width }}
		>
			<table className='table-fixed bg-neutral-white'>
				<thead>
					<tr className='flex flex-row'>
						{table.getFlatHeaders().map((header) => {
							const columnConfig = columnConfigs[header.id];

							return (
								<th
									key={header.id}
									className={
										' flex flex-col justify-center border-x border-neutral-gray-5 bg-primary-bright-4 px-1 py-1 text-left font-medium ' +
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
							<tr key={row.id} className='flex flex-row'>
								{row.getVisibleCells().map((cell) => {
									const columnConfig = columnConfigs[cell.column.id];

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
