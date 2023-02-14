import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { Applicant } from './ApplicantTracking.interface';
import { useApplicantTrackingStore } from './ApplicantTracking.store';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';

const FAKE_DATA: Applicant[] = [
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0135095087',
		AppliedPosition: 'developer',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0135095087',
		AppliedPosition: 'hr',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
];

export const ApplicantTracking = () => {
	const { setApplicants, setSelectedApplicant } = useApplicantTrackingStore(
		(state) => state
	);

	useEffect(() => {
		setApplicants(FAKE_DATA);
		setSelectedApplicant(FAKE_DATA[0]);
	}, []);

	return (
		<div className='flex-1 pt-2 pl-2'>
			<h2 className='w-full text-h2'>Quản lý hồ sơ Ứng viên</h2>
			<DataTable />
			<div className='flex flex-row gap-4'>
				<DetailSection />
			</div>
		</div>
	);
};
