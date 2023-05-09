// Regular styles only change based on width/secondary
// --
// Other styles are state styles. e.g: hover, disabled
// and can be included always

export const buttonStyleMapping = {
	all:
		' rounded cursor-pointer px-2 py-2 font-semibold ' +
		' hover:shadow ' +
		' active:shadow ' +
		' disabled:opacity-50 disabled:cursor-not-allowed ',

	primary:
		' bg-primary-dark-1 text-neutral-gray-1 hover:shadow-primary-normal active:shadow-primary-normal active:bg-primary-dark-2 ',
	secondary:
		' bg-neutral-gray-1 text-neutral-gray-9 border border-primary-normal hover:shadow-primary-normal active:shadow-primary-normal active:bg-primary-bright-6 ',
	success:
		' bg-state-success-normal text-neutral-gray-1 hover:shadow-state-success-normal active:shadow-state-success-normal active:bg-state-success-dark ',
	error:
		' bg-state-error-normal text-neutral-gray-1 hover:shadow-state-error-normal active:shadow-state-error-normal active:bg-state-error-dark ',

	full: { width: ' w-full ' },
	small: { width: ' w-w-button-small ' },
	medium: { width: ' w-w-button-medium ' },
	big: { width: ' w-w-button-big ' },
};
