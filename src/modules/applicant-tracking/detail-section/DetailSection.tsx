import { DisplayConfigs } from '../../../app/App.display';
import { List } from '../../../components/organisms/List/List';
import { useTableStore } from '../../../components/organisms/Table/Table.store';
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
	const visibleApplicants = useApplicantTrackingStore(
		(state) => state.applicants
	);
	const selectedRowIndex = useTableStore((state) => state.selectedRowIndex);
	const selectedApplicant =
		selectedRowIndex === undefined
			? undefined
			: visibleApplicants[selectedRowIndex];

	const displayConfigs: DisplayConfigs = {
		labellers: APPLICANT_TRACKING_LABELLERS,
		displayModeMappers: APPLICANT_TRACKING_DISPLAY_MODE_MAPPERS,
		mappers: APPLICANT_TRACKING_MAPPERS,
		formattableFieldMappers: APPLICANT_TRACKING_FORMATTABLE_FIELD_MAPPERS,
		formatters: APPLICANT_TRACKING_FORMATTERS,
	};

	return (
		<div className='flex-1 rounded border border-semantic-section-border p-2 shadow-md'>
			<h3 className='text-h3 font-medium text-secondary-dark-1'>
				{selectedApplicant
					? 'Chi tiết hồ sơ ứng tuyển'
					: 'Chọn 1 hồ sơ để hiển thị chi tiết...'}
			</h3>

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
