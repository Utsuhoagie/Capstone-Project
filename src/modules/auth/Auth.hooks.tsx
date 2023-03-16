import React from 'react';
import { useQuery } from 'react-query';
import { BASE_URL } from '../../app/App';
import { useAuthStore } from './Auth.store';

export const useRefreshIfNeeded = async () => {
	const { accessToken, refreshToken } = useAuthStore();

	// useQuery('checkToken', async () => {
	//   const res = await fetch(`${BASE_URL}/Auth/CheckToken`, {
	//     headers: {
	//       Authorization: `Bearer ${accessToken}`
	//     }
	//   });

	//   if (res.status != 200)
	// });

	const res = await fetch(`${BASE_URL}/Auth/CheckToken`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (res.status === 200) {
		return false;
	}

	const refreshRes = await fetch('');

	return;
};
