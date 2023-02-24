export type Pagination = {
	TotalCount: number;
	PageSize: number;
	CurrentPage: number;
	TotalPages: number;
	HasPrevious: boolean;
	HasNext: boolean;
};

export type PagedResult<T> = Pagination & {
	Items: Array<T>;
};
