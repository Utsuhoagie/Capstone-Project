import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useTableStore } from '../../components/organisms/Table/Table.store';
import {
	Applicant,
	Applicant_APIResponse,
} from './ApplicantTracking.interface';
import { useApplicantTrackingStore } from './ApplicantTracking.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';

export const ApplicantTracking = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.get('page') ?? 1;

	const { applicants, setApplicants, setSelectedApplicant } =
		useApplicantTrackingStore((state) => state);
	const selectedRowIndex = useTableStore((state) => state.selectedRowIndex);

	const { isLoading, error, data } = useQuery(
		'applicant-tracking',
		async () => {
			const res = await fetch(
				`https://localhost:5000/api/ApplicantTracking?page=${currentPage}`
			);

			const data: Applicant_APIResponse[] = await res.json();

			console.log({ data });

			const applicants: Applicant[] = data.map((datum) => ({
				...datum,
				BirthDate: datum.BirthDate
					? dayjs(datum.BirthDate).toDate()
					: undefined,
				Email: datum.Email ?? undefined,
				AppliedDate: dayjs(datum.AppliedDate).toDate(),
			}));

			setApplicants(applicants);
		}
	);

	useEffect(() => {
		if (selectedRowIndex === undefined) {
			setSelectedApplicant(undefined);
			return;
		}

		const selectedApplicant = applicants[selectedRowIndex];
		setSelectedApplicant(selectedApplicant);
	}, [selectedRowIndex]);

	if (isLoading) return <p>'Loading...'</p>;

	if (error) return <p>Error! {JSON.stringify(error)}</p>;

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
