import { useQuery } from 'react-query';
import { BASE_URL } from '../../../../app/App';
import { Module } from '../../../../app/App.modules';
import { useAuthStore } from '../../../../modules/auth/Auth.store';
import { PagedResult } from '../../../organisms/Table/Pagination/Pagination.interface';
import { SelectOptionPair } from './SelectInput.interface';

interface useSelectOptionsProps {
	module: Module;
}

type useSelectOptionsReturn = (
	props: useSelectOptionsProps
) => SelectOptionPair[];

export const useSelectOptions: useSelectOptionsReturn = ({
	module,
}: useSelectOptionsProps) => {
	const url = `${BASE_URL}/${module}`;

	const { accessToken } = useAuthStore();

	const { data } = useQuery(module, async () => {
		const res = await fetch(url, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!res.ok) {
			return [];
		}

		const pagedResponse: PagedResult<any> = await res.json();
		const options = pagedResponse.Items;

		return options;
	});

	let selectOptions: SelectOptionPair[] = [];

	if (!data) {
		return [];
	}

	switch (module) {
		case 'Auth':
			break;
		case 'Applicants':
			break;
		case 'Employees':
			break;
		case 'Positions':
			selectOptions = data.map((datum) => ({
				value: datum.Name,
				display: datum.Name,
			}));
			break;
	}

	return selectOptions;
};
