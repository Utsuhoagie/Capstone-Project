import { useQuery } from 'react-query';
import { Module } from '../../../../app/App.modules';
import { API } from '../../../../config/axios/axios.config';
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
	const { accessToken } = useAuthStore();

	const { data } = useQuery(module, async () => {
		const res = await API.get(module);

		if (res.status >= 300) {
			return [];
		}

		const pagedResponse: PagedResult<any> = res.data;
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
