import dayjs, { Dayjs } from 'dayjs';
import {
	ColumnConfigs,
	TableConfig,
} from '../../../components/organisms/Table/Table.interface';

export const tableConfig: TableConfig = {
	width: 1300,
};

export const columnConfigs: ColumnConfigs = {
	NationalId: { header: 'CMND / CCCD', displayType: 'normal', width: 130 },
	FullName: { header: 'Họ tên', displayType: 'normal', width: 280 },
	Gender: { header: 'Giới tính', displayType: 'normal', width: 100 },
	BirthDate: {
		header: 'Ngày sinh',
		displayType: 'formatted',
		width: 120,
		formatter: (value: Date) => dayjs(value).format('D-MM-YYYY'),
	},
	Address: { header: 'Địa chỉ', displayType: 'normal', width: 300 },
	Phone: { header: 'Số điện thoại', displayType: 'normal', width: 120 },
	Email: { header: 'Email', displayType: 'normal', width: 140 },
	AppliedPosition: {
		header: 'Vị trí ứng tuyển',
		displayType: 'normal',
		width: 140,
	},
	AppliedDate: {
		header: 'Ngày ứng tuyển',
		displayType: 'formatted',
		width: 150,
		formatter: (value: Date) => dayjs(value).format('D-MM-YYYY'),
	},
	AskingSalary: {
		header: 'Mức lương đề nghị',
		displayType: 'normal',
		width: 150,
	},
};
