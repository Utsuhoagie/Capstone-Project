import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import { Routes } from '../config/router/Routes';

export const IS_DEBUG_MODE = true;

const queryClient = new QueryClient();

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes />
		</QueryClientProvider>
	);
};
