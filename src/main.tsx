import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './app/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<div className='overflow-x-clip bg-primary-bright-7'>
				<App />
			</div>
		</BrowserRouter>
	</React.StrictMode>
);
