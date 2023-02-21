import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { clone } from 'ramda';

interface DialogStore {
	isOpen: boolean;
	isClosable: boolean;
	title?: string;
	content: React.ReactNode;

	openDialog: ({
		isClosable,
		title,
		content,
	}: {
		isClosable: boolean;
		title?: string;
		content: React.ReactNode;
	}) => void;
	closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>()(
	devtools((set) => ({
		isOpen: false,
		isClosable: false,
		title: undefined,
		content: undefined,

		openDialog: ({
			isClosable,
			title,
			content,
		}: {
			isClosable: boolean;
			title?: string;
			content: React.ReactNode;
		}) =>
			set((prev) => {
				let next = clone(prev);
				next.isOpen = true;
				next.isClosable = isClosable;
				next.title = title;
				next.content = content;
				return next;
			}),
		closeDialog: () =>
			set((prev) => {
				let next = clone(prev);
				next.isOpen = false;
				return next;
			}),
	}))
);

interface ToastStore {
	isOpen: boolean;
	state?: 'success' | 'error';
	timeoutId?: number;
	// title?: string;
	// content: React.ReactNode;

	showToast: ({ state }: { state: 'success' | 'error' }) => void;
	hideToast: () => void;
	setTimeoutId: (timeoutId: number) => void;
}

export const useToastStore = create<ToastStore>()(
	devtools((set) => ({
		isOpen: false,
		state: undefined,
		timeoutId: undefined,
		// title: undefined,
		// content: undefined,

		showToast: ({ state }: { state: 'success' | 'error' }) =>
			set((prev) => {
				let next = clone(prev);
				next.isOpen = true;
				next.state = state;
				return next;
			}),
		hideToast: () =>
			set((prev) => {
				let next = clone(prev);
				next.isOpen = false;
				return next;
			}),
		setTimeoutId: (timeoutId: number) =>
			set((prev) => {
				let next = clone(prev);
				next.timeoutId = timeoutId;
				return next;
			}),
	}))
);
