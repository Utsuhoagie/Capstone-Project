import QRCode from 'react-qr-code';
import { useQuery } from 'react-query';
import { API } from '../../../config/axios/axios.config';

export const QrDisplay = () => {
	const { isLoading, error, data } = useQuery('daily-hash', async () => {
		const res = await API.get('Attendances/DailyHash');
		return res.data;
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error!</p>;
	}

	return (
		<div className='flex h-full flex-col items-center justify-center gap-4'>
			<p className='text-h1 font-bold text-neutral-gray-9'>
				Dùng app để quét mã này.
			</p>
			<QRCode className='h-80 w-80' value={data} />
		</div>
	);
};
