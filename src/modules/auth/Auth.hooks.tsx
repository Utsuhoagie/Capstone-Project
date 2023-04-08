import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../../config/axios/axios.config';
import { Auth_API_Response } from './Auth.interface';
import { useAuthStore } from './Auth.store';

/* export const useNOT_WORKING_YET_IsRefreshNeededAsync = async () => {
	const navigate = useNavigate();
	const { accessToken, refreshToken, setTokens, unsetLogin } = useAuthStore();

	const res = await fetch(`${BASE_URL}/Auth/CheckToken`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	// Token still valid, no need to refresh
	if (res.status === 200) {
		return false;
	}

	const refreshRes = await fetch(`${BASE_URL}/Auth/Refresh`, {
		method: 'POST',
		body: JSON.stringify({
			AccessToken: accessToken,
			RefreshToken: refreshToken,
		}),
	});

	// Refresh successful
	if (refreshRes.status === 200) {
		const { AccessToken, RefreshToken }: Auth_API_Response =
			await refreshRes.json();
		setTokens(AccessToken, RefreshToken);
		return true;
	}

	// Refresh failed, must login again
	unsetLogin();
	navigate('/auth/Login');

	return;
}; */

export const useRefresh = async () => {
	// const navigate = useNavigate();
	// const { accessToken, refreshToken, setTokens, unsetLogin } = useAuthStore();
	// useQuery('refresh', async () => {
	// 	const refreshRes = await AuthAPI.post('Refresh', {
	// 		body: JSON.stringify({
	// 			AccessToken: accessToken,
	// 			RefreshToken: refreshToken,
	// 		}),
	// 	});
	// 	if (refreshRes.status !== 200) {
	// 		unsetLogin();
	// 		navigate('/auth');
	// 	}
	// 	const data: Auth_API_Response = await refreshRes.json();
	// 	setTokens(data.AccessToken, data.RefreshToken);
	// });
	// return;
};
