import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Applicant } from './ApplicantTracking.interface';
import { useApplicantTrackingStore } from './ApplicantTracking.store';
import { ButtonSection } from './button-section/ButtonSection';
import { DataTable } from './data-table/DataTable';
import { DetailSection } from './detail-section/DetailSection';

const FAKE_DATA: Applicant[] = [
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0909123456',
		ExperienceYears: 0,
		AppliedPosition: 'developer',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '099084078000',
		FullName: 'Coo Far',
		Gender: 'female',
		BirthDate: dayjs().toDate(),
		Phone: '0902987654',
		ExperienceYears: 0,
		AppliedPosition: 'hr',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0909123456',
		ExperienceYears: 0,
		AppliedPosition: 'developer',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '099084078000',
		FullName: 'Coo Far',
		Gender: 'female',
		BirthDate: dayjs().toDate(),
		Phone: '0902987654',
		ExperienceYears: 0,
		AppliedPosition: 'hr',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0909123456',
		ExperienceYears: 0,
		AppliedPosition: 'developer',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '099084078000',
		FullName: 'Coo Far',
		Gender: 'female',
		BirthDate: dayjs().toDate(),
		Phone: '0902987654',
		ExperienceYears: 0,
		AppliedPosition: 'hr',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0909123456',
		ExperienceYears: 0,
		AppliedPosition: 'developer',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '099084078000',
		FullName: 'Coo Far',
		Gender: 'female',
		BirthDate: dayjs().toDate(),
		Phone: '0902987654',
		ExperienceYears: 0,
		AppliedPosition: 'hr',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '012345678000',
		FullName: 'Abc Foo',
		Gender: 'male',
		BirthDate: dayjs().toDate(),
		Phone: '0909123456',
		ExperienceYears: 0,
		AppliedPosition: 'developer',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
	{
		NationalId: '099084078000',
		FullName: 'Coo Far',
		Gender: 'female',
		BirthDate: dayjs().toDate(),
		Phone: '0902987654',
		ExperienceYears: 0,
		AppliedPosition: 'hr',
		AppliedDate: dayjs().toDate(),
		AskingSalary: 5_000_000,
	},
];

export const ApplicantTracking = () => {
	const setApplicants = useApplicantTrackingStore(
		(state) => state.setApplicants
	);

	useEffect(() => {
		setApplicants(FAKE_DATA);
	}, []);

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
