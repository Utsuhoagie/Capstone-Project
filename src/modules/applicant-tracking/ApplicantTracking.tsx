import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
	Applicant,
	Applicant_APIResponse,
} from './ApplicantTracking.interface';
import { useApplicantTrackingStore } from './ApplicantTracking.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';

export const ApplicantTracking = () => {
	const setApplicants = useApplicantTrackingStore(
		(state) => state.setApplicants
	);

	const { isLoading, error, data } = useQuery(
		'applicant-tracking',
		async () => {
			const res = await fetch('https://localhost:5000/api/ApplicantTracking');

			const data: Applicant_APIResponse[] = await res.json();

			console.log({ data });

			const applicants: Applicant[] = data.map((datum) => ({
				...datum,
				BirthDate: datum.BirthDate ?? undefined,
				Email: datum.Email ?? undefined,
			}));

			setApplicants(applicants);
		}
	);

	if (isLoading) return <p>'Loading...'</p>;

	if (error) return <p>Error! {JSON.stringify(error)}</p>;

	// useEffect(() => {
	// 	setApplicants(FAKE_DATA);
	// }, []);

	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-h1'>Quản lý hồ sơ Ứng viên</h1>
			<DataTable />
			<div className='flex flex-row gap-4'>
				<DetailSection />
				<ButtonSection />
			</div>
		</div>
	);
};
