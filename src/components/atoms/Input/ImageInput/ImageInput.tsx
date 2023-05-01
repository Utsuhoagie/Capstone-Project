import { Controller, useFormContext } from 'react-hook-form';
import { createImageUrl } from '../../../../modules/app/file/File.utils';
import PLACEHOLDER_PERSON_IMAGE from '../../../../assets/img/PLACEHOLDER_PERSON_IMAGE.png';
import { ExtFile, FileInputButton } from '@files-ui/react';
import { useState } from 'react';

export interface ImageInputProps {
	name: string;
}

export const ImageInput = ({ name }: ImageInputProps) => {
	const methods = useFormContext();
	const defaultFormValue = methods.watch(name) as File | undefined;

	const [files, setFiles] = useState<ExtFile[]>([]);
	const hasValidFile = Boolean(files[0] && files[0].file);

	const defaultImageSrc = defaultFormValue
		? createImageUrl(defaultFormValue)
		: hasValidFile
		? createImageUrl(files[0].file as File)
		: PLACEHOLDER_PERSON_IMAGE;

	return (
		<div className='flex w-w-image-input flex-col items-center gap-1'>
			<img className='w-w-image-input' src={defaultImageSrc} />

			<FileInputButton
				maxFiles={1}
				maxFileSize={512_000} /* 500 KB */
				accept='image/jpeg'
				behaviour='replace'
				label='Chọn ảnh'
				onChange={(extFiles: ExtFile[]) => {
					setFiles(extFiles);
					methods.setValue(name, extFiles[0].file);
				}}
				value={files}
			/>

			<p>Chọn 1 ảnh có đuôi .jpeg, tối đa 500 KB.</p>
		</div>
	);
};
