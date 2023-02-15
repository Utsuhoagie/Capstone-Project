// Regular styles only change based on width/secondary
// --
// Other styles are state styles. e.g: hover, disabled
// and can be included always

export const buttonStyleMapping = {
	all:
		' rounded cursor-pointer px-6 py-2 ' +
		' hover:shadow hover:shadow-primary-normal ' +
		' active:shadow active:shadow-primary-normal ' +
		' disabled:opacity-50 disabled:cursor-not-allowed ',

	primary: ' bg-primary-dark-1 text-neutral-gray-1 active:bg-primary-dark-2 ',
	secondary:
		' bg-neutral-gray-1 text-neutral-gray-9 border border-primary-normal active:bg-primary-bright-6 ',

	full: { width: ' w-full ' },
	small: { width: ' w-w-button-small ' },
	medium: { width: ' w-w-button-medium ' },
	big: { width: ' w-w-button-big ' },
};
