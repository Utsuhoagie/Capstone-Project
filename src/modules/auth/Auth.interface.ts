export interface IdentityError {
	Code: string;
	Description: string;
}

export interface Auth_API_Response {
	Status: number;
	Errors: IdentityError[];
	AccessToken: string;
	RefreshToken: string;
}

export type Role = 'Admin' | 'Employee';

export interface JWT_Claims {
	Email: string;
	Role: Role;
	exp: number;
	iss: string;
	aud: string;
}
