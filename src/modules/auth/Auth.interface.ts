export interface IdentityError {
	Description: string;
}

export interface Auth_API_Response {
	Status: number;
	Errors: IdentityError[];
	AccessToken: string;
	RefreshToken: string;
}
