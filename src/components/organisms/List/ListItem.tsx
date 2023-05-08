import React from 'react';
import {
	DisplayConfigs,
	getDisplayForFieldValue,
	getLabelForField,
} from '../../../app/App.display';
import { useDialogStore, useToastStore } from '../../../app/App.store';
import { EmptyText } from '../../atoms/EmptyText/EmptyText';
import { Label } from '../../atoms/Input/Label';
import { Page, Document } from 'react-pdf/dist/esm/entry.vite';
import { useQuery } from 'react-query';
import { API } from '../../../config/axios/axios.config';
import { Module } from '../../../app/App.modules';

interface ListItemProps {
	module: Module;
	displayConfigs: DisplayConfigs;
	itemData: {
		field: string;
		value: any;
	};
}

export const ListItem = ({
	module,
	displayConfigs,
	itemData: { field, value },
}: ListItemProps) => {
	const { openDialog } = useDialogStore();
	const { showToast } = useToastStore();

	const label = getLabelForField({
		labellers: displayConfigs.labellers,
		field,
	});

	const isFile =
		typeof value === 'string' && value.slice(value.length - 4) === '.pdf';

	const resumeQuery = useQuery(
		['Files', { module, fileName: isFile ? value : undefined }],
		async () => {
			const res = await API.get(`Files/Document/${module}/${value}`, {
				responseType: 'blob',
			});

			if (res.status >= 400) {
				showToast({ state: 'error' });
				return undefined;
			}

			return res.data as File;
		},
		{
			enabled: isFile,
		}
	);

	const displayValue = isFile
		? value
		: getDisplayForFieldValue({
				displayConfigs,
				field,
				value,
		  });

	return (
		<div className='flex w-full flex-row items-center justify-between'>
			<Label isForList label={label} />
			<div>
				{displayValue === undefined ? (
					<EmptyText />
				) : isFile ? (
					<p
						className='cursor-pointer text-body text-neutral-gray-9 underline hover:bg-primary-bright-5'
						onClick={() => {
							const resume = resumeQuery.data;
							if (resume) {
								openDialog({
									isClosable: true,
									title: displayValue,
									content: (
										<Document file={resume}>
											<Page
												width={750}
												pageIndex={0}
												renderAnnotationLayer={false}
												renderTextLayer={false}
												renderInteractiveForms={false}
											/>
										</Document>
									),
								});
							}
						}}
					>
						{displayValue}
					</p>
				) : (
					displayValue
				)}
			</div>
		</div>
	);
};
