import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import * as R from 'ramda';

type User = { name: string; password: string };

type AuthStore = {
	isLoggedIn: boolean;
	user: User | undefined;
	login: (name: string, password: string) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
	devtools(
		persist(
			(set) => ({
				isLoggedIn: false,
				user: undefined,
				login: (name: string, password: string) =>
					set((prev) => {
						let next = R.clone(prev);
						next.isLoggedIn = true;
						next.user = { name, password };
						return next;
					}),
				logout: () =>
					set((prev) => {
						let next = R.clone(prev);
						next.isLoggedIn = false;
						next.user = undefined;
						return next;
					}),
			}),
			{ name: 'auth-store' }
		)
	)
);
