export type Pagination = {
	Count: number;

	CurrentPage: number;
	PageSize: number;

	TotalCount: number;
	TotalPages: number;

	HasPrevious: boolean;
	HasNext: boolean;
};

export type PagedResult<T> = Pagination & {
	Items: Array<T>;
};
