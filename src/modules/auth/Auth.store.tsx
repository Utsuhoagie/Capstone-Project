import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { clone } from 'ramda';

interface User {
	Email: string;
	Password: string;
}

interface AuthStore {
	isLoggedIn: boolean;
	accessToken: string | undefined;
	user: User | undefined;
	setAccessToken: (accessToken: string) => void;
	login: (Email: string, Password: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
	devtools(
		persist(
			(set) => ({
				isLoggedIn: false,
				accessToken: undefined,
				user: undefined,

				setAccessToken: (accessToken: string) =>
					set((prev) => {
						let next = clone(prev);
						next.isLoggedIn = true;
						next.accessToken = accessToken;
						return next;
					}),
				login: (Email: string, Password: string) =>
					set((prev) => {
						let next = clone(prev);
						next.isLoggedIn = true;
						next.user = { Email, Password };
						return next;
					}),
				logout: () =>
					set((prev) => {
						let next = clone(prev);
						next.isLoggedIn = false;
						next.accessToken = undefined;
						next.user = undefined;
						return next;
					}),
			}),
			{ name: 'auth-store' }
		)
	)
);
