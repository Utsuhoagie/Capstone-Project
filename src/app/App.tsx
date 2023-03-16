import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import { Routes } from '../config/router/Routes';

export const BASE_URL = 'https://localhost:5000/api';

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes />
		</QueryClientProvider>
	);
};
