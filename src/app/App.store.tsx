import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DialogProps } from '../components/molecules/Dialog/Dialog';
import { clone } from 'ramda';

interface DialogStore extends DialogProps {
	setDialogIsOpen: (isOpen: boolean) => void;
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

		setDialogIsOpen: (isOpen: boolean) =>
			set((prev) => {
				let next = clone(prev);
				next.isOpen = isOpen;
				return next;
			}),
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
