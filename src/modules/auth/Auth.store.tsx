import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { clone } from 'ramda';

interface EmployeeUser {
	Email: string;
	Password: string;
}

interface AuthStore {
	accessToken: string | undefined;
	refreshToken: string | undefined;
	user: EmployeeUser | undefined;

	setTokens: (accessToken: string, refreshToken: string) => void;
	// login: (Email: string, Password: string) => void;
	unsetLogin: () => void;
}

export const useAuthStore = create<AuthStore>()(
	devtools(
		persist(
			(set) => ({
				accessToken: undefined,
				refreshToken: undefined,
				user: undefined,

				setTokens: (accessToken: string, refreshToken: string) =>
					set((prev) => {
						let next = clone(prev);
						next.accessToken = accessToken;
						next.refreshToken = refreshToken;
						return next;
					}),
				// login: (Email: string, Password: string) =>
				// 	set((prev) => {
				// 		let next = clone(prev);
				// 		next.isLoggedIn = true;
				// 		next.user = { Email, Password };
				// 		return next;
				// 	}),
				unsetLogin: () =>
					set((prev) => {
						let next = clone(prev);
						next.accessToken = undefined;
						next.refreshToken = undefined;
						next.user = undefined;
						return next;
					}),
			}),
			{ name: 'auth-store' }
		)
	)
);
