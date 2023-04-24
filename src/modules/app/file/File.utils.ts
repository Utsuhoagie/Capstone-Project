export function createImageUrl(file: Blob): string {
	return URL.createObjectURL(file);
}
