import dayjs from 'dayjs';
import { omit } from 'ramda';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../components/organisms/Table/Pagination/Pagination.constants';
import {
	PagedResult,
	Pagination,
} from '../../components/organisms/Table/Pagination/Pagination.interface';
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
	const navigate = useNavigate();
	const [searchParams, _] = useSearchParams();
	const currentPageString = searchParams.get('page') ?? '1';
	const currentPage = parseInt(currentPageString);

	const { selectedRowIndex, setPagination } = useTableStore((state) => state);
	const { applicants, setApplicants, setSelectedApplicant } =
		useApplicantTrackingStore((state) => state);

	const { isLoading, error, data } = useQuery(
		['applicant-tracking', currentPage],
		async () => {
			const res = await fetch(
				`https://localhost:5000/api/ApplicantTracking?page=${currentPage}&pageSize=${PAGE_SIZE}`
			);

			const pagedResponse: PagedResult<Applicant_APIResponse> =
				await res.json();

			console.log('API response ', pagedResponse);

			const pagination: Pagination = omit(['Items'], pagedResponse);

			setPagination(pagination);

			const applicants: Applicant[] = pagedResponse.Items.map((Item) => ({
				...Item,
				BirthDate: Item.BirthDate ? dayjs(Item.BirthDate).toDate() : undefined,
				Email: Item.Email ?? undefined,
				AppliedDate: dayjs(Item.AppliedDate).toDate(),
			}));

			setApplicants(applicants);
		},
		{ keepPreviousData: true }
	);

	useEffect(() => {
		if (selectedRowIndex === undefined) {
			setSelectedApplicant(undefined);
			return;
		}
		const selectedApplicant = applicants[selectedRowIndex];
		setSelectedApplicant(selectedApplicant);
	}, [selectedRowIndex]);

	useEffect(() => {
		navigate(`?page=${searchParams.get('page')}`);
	}, [searchParams]);

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
