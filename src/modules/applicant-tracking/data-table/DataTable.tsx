import { Table } from '../../../components/organisms/Table/Table';
import {
	APPLICANT_TRACKING_TABLE_CONFIGS,
	APPLICANT_TRACKING_COLUMN_CONFIGS,
} from './DataTable.config';
import { DisplayConfigs } from '../../../app/App.display';
import {
	APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
	APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
	APPLICANT_TRACKING_FORMATTERS,
	APPLICANT_TRACKING_LABELLERS,
	APPLICANT_TRACKING_MAPPERS,
} from '../ApplicantTracking.display';
import { useApplicantTrackingStore } from '../ApplicantTracking.store';
import { ColumnConfigs } from '../../../components/organisms/Table/Table.interface';
import { omit } from 'ramda';

export const DataTable = () => {
	const applicants = useApplicantTrackingStore((state) => state.applicants);

	const displayConfigs: DisplayConfigs = {
		labellers: APPLICANT_TRACKING_LABELLERS,
		displayModeMappers: APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
		mappers: APPLICANT_TRACKING_MAPPERS,
		formattableFieldMappers: APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
		formatters: APPLICANT_TRACKING_FORMATTERS,
	};

	const subsetColumnConfigs = omit(
		['NationalId', 'Address'],
		APPLICANT_TRACKING_COLUMN_CONFIGS
	);

	return (
		<Table
			data={applicants}
			displayConfigs={displayConfigs}
			tableConfig={APPLICANT_TRACKING_TABLE_CONFIGS}
			columnConfigs={subsetColumnConfigs}
		/>
	);
};
