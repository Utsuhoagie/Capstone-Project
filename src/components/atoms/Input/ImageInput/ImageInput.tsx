import { useFormContext } from 'react-hook-form';
import { createImageUrl } from '../../../../modules/app/file/File.utils';
import PLACEHOLDER_PERSON_IMAGE from '../../../../assets/img/PLACEHOLDER_PERSON_IMAGE.png';

export interface ImageInputProps {
	name: string;
}

export const ImageInput = ({ name }: ImageInputProps) => {
	const methods = useFormContext();

	const imageMaybePlural: File | FileList | undefined = methods.watch(name);
	const isPlural = imageMaybePlural instanceof FileList;
	const imageUrl = isPlural
		? imageMaybePlural && imageMaybePlural.length > 0
			? createImageUrl(imageMaybePlural[0])
			: undefined
		: imageMaybePlural
		? createImageUrl(imageMaybePlural)
		: undefined;

	return (
		<div className='w-w-image-input'>
			<input type='file' accept='image/*' {...methods.register(name)} />

			<img
				className='w-w-image-input'
				src={imageUrl ?? PLACEHOLDER_PERSON_IMAGE}
			/>
		</div>
	);
};
