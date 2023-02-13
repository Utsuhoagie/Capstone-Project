import dayjs, { Dayjs } from 'dayjs';
import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';

export const tableConfig: TableConfig = {
	width: 1300,
};

export const columnConfigs: ColumnConfigs = {
	NationalId: {
		header: 'CMND / CCCD',
		displayMode: 'formatted',
		width: 140,
	},
	FullName: { header: 'Họ tên', displayMode: 'normal', width: 280 },
	Gender: { header: 'Giới tính', displayMode: 'mapped', width: 100 },
	BirthDate: {
		header: 'Ngày sinh',
		displayMode: 'formatted',
		width: 120,
	},
	Address: { header: 'Địa chỉ', displayMode: 'normal', width: 300 },
	Phone: {
		header: 'Số điện thoại',
		displayMode: 'formatted',
		width: 120,
	},
	Email: { header: 'Email', displayMode: 'normal', width: 140 },
	AppliedPosition: {
		header: 'Vị trí ứng tuyển',
		displayMode: 'mapped',
		width: 140,
	},
	AppliedDate: {
		header: 'Ngày ứng tuyển',
		displayMode: 'formatted',
		width: 150,
	},
	AskingSalary: {
		header: 'Mức lương đề nghị',
		displayMode: 'formatted',
		width: 150,
	},
};
