import React from 'react';
import { DataTable } from './data-table/DataTable';

export const ApplicantTracking = () => {
	return (
		<div className='flex-1 pt-2 pl-2'>
			<h2 className='w-full text-h2'>Quản lý hồ sơ Ứng viên</h2>
			<DataTable />
		</div>
	);
};
