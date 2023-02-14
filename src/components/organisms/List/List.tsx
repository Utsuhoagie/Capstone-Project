import dayjs from 'dayjs';
import { Applicant } from '../../../modules/applicant-tracking/ApplicantTracking.interface';
import { ListProps } from './List.interface';
import { ListItem } from './ListItem';

const FAKE_DATA: Applicant = {
	NationalId: '012345678000',
	FullName: 'Abc Foo',
	Gender: 'male',
	BirthDate: dayjs().toDate(),
	Phone: '0135095087',
	AppliedPosition: 'developer',
	AppliedDate: dayjs().toDate(),
	AskingSalary: 5_000_000,
};

export const List = ({ data, displayConfigs }: ListProps) => {
	return (
		<div className='flex w-full flex-col gap-2 divide-y divide-yellow-900 bg-red-50'>
			{Object.keys(data).map((field) => (
				<ListItem
					key={field}
					displayConfigs={displayConfigs}
					itemData={{ field: field, value: data[field] }}
				/>
			))}
		</div>
	);
};
