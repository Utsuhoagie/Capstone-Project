import { DisplayConfigs } from '../../../app/App.display';
import { Heading } from '../../../components/atoms/Heading/Heading';
import { List } from '../../../components/organisms/List/List';
import {
	APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
	APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
	APPLICANT_TRACKING_FORMATTERS,
	APPLICANT_TRACKING_LABELLERS,
	APPLICANT_TRACKING_MAPPERS,
} from '../ApplicantTracking.display';
import { useApplicantTrackingStore } from '../ApplicantTracking.store';
import { APPLICANT_TRACKING_LIST_ITEM_CONFIGS } from './DetailSection.config';

export const DetailSection = () => {
	const selectedApplicant = useApplicantTrackingStore(
		(state) => state.selectedApplicant
	);

	const displayConfigs: DisplayConfigs = {
		labellers: APPLICANT_TRACKING_LABELLERS,
		displayModeMappers: APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
		mappers: APPLICANT_TRACKING_MAPPERS,
		formattableFieldMappers: APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
		formatters: APPLICANT_TRACKING_FORMATTERS,
	};

	return (
		<div className='rounded border border-secondary-dark-1 p-2'>
			<Heading text='Chi tiết hồ sơ ứng tuyển' />
			{selectedApplicant && (
				<List
					data={selectedApplicant}
					displayConfigs={displayConfigs}
					listItemConfigs={APPLICANT_TRACKING_LIST_ITEM_CONFIGS}
				/>
			)}
		</div>
	);
};
