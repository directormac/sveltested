export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type User = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	date: Date;
	avatar: string;
};

export type LoginUser = Omit<User, 'firstName' | 'lastName' | 'gender' | 'date' | 'avatar'>;
export type RegisterUser = Partial<Pick<User, 'firstName' | 'lastName' | 'avatar'>> & {
	confirmPassword: string;
};
