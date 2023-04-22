import dayjs from 'dayjs';

export function preprocessStringToOptionalDate(val) {
	return Boolean(val) ? dayjs(val).toDate() : undefined;
}

export function preprocessStringToOptionalString(val) {
	return Boolean(val) ? val : undefined;
}

export function preprocessFileListToFirstFile(val) {
	return val === undefined
		? undefined
		: val instanceof FileList
		? val[0]
		: null;
}

export function isIntValid(val: unknown): boolean {
	const valStr = val as string;
	return Boolean(valStr.match(/^\d{1,9}$/));
}

export function convertFromDomainObjToFormData<T extends object>(obj: T) {
	const formData = new FormData();

	Object.keys(obj).forEach((field) => {
		const fieldData = obj[field];
		const isNilField = fieldData === undefined || fieldData === null;
		const isDateField =
			Object.prototype.toString.call(fieldData) === '[object Date]';

		if (isNilField) {
			return;
		}

		if (isDateField) {
			formData.append(field, dayjs(fieldData).toISOString());
		} else {
			formData.append(field, fieldData);
		}
	});
	console.log([...formData]);

	return formData;
}
