import { Controller, useFormContext } from 'react-hook-form';
import { createImageUrl } from '../../../../modules/app/file/File.utils';
import PLACEHOLDER_PERSON_IMAGE from '../../../../assets/img/PLACEHOLDER_PERSON_IMAGE.png';
import { ExtFile, FileInputButton } from '@files-ui/react';
import { useState } from 'react';
import { useDialogStore } from '../../../../app/App.store';
import { Page, Document } from 'react-pdf/dist/esm/entry.vite';

export interface FileInputProps {
	name: string;
}

export const FileInput = ({ name }: FileInputProps) => {
	const { openDialog } = useDialogStore();
	const methods = useFormContext();
	const defaultFormFile = methods.watch(name) as File | undefined;

	const [numPages, setNumPages] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	const [files, setFiles] = useState<ExtFile[]>([]);

	// Has either a default form File, or a new ExtFile
	const hasValidFile =
		Boolean(files[0] && files[0].file) || Boolean(defaultFormFile);
	const fileName = Boolean(files[0] && files[0].file)
		? files[0].file!.name
		: undefined;

	return (
		<div className='flex w-w-image-input flex-col items-center gap-2'>
			<FileInputButton
				maxFiles={1}
				maxFileSize={512_000} /* 500 KB */
				accept='application/pdf'
				behaviour='replace'
				label='Chọn CV'
				onChange={(extFiles: ExtFile[]) => {
					setFiles(extFiles);
					methods.setValue(name, extFiles[0].file);
				}}
				value={files}
			/>

			{hasValidFile ? (
				<p
					className='cursor-pointer text-body text-neutral-gray-9 underline hover:bg-primary-bright-5'
					onClick={() => {
						openDialog({
							isClosable: true,
							title: defaultFormFile?.name,
							content: (
								<Document
									file={defaultFormFile}
									onLoadSuccess={({ numPages }) => {
										setNumPages(numPages);
									}}
								>
									<Page
										width={750}
										pageNumber={page}
										renderAnnotationLayer={false}
										renderTextLayer={false}
										renderInteractiveForms={false}
									/>
								</Document>
							),
						});
					}}
				>
					{fileName ?? defaultFormFile?.name}
				</p>
			) : (
				<p className='text-body text-neutral-gray-9'>Chưa có CV.</p>
			)}
		</div>
	);
};
