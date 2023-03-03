import dayjs from 'dayjs';

export function preprocessStringToOptionalDate(val) {
	return Boolean(val) ? dayjs(val).toDate() : undefined;
}

export function preprocessStringToOptionalString(val) {
	return Boolean(val) ? val : undefined;
}

export function isIntValid(val: unknown): boolean {
	const valStr = val as string;
	return Boolean(valStr.match(/^\d{1,9}$/));
}
