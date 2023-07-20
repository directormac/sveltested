export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type User = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	dateOfBirth: Date;
	avatar: string;
};

export type LoginUser = Omit<User, 'firstName' | 'lastName' | 'gender' | 'dateOfBirth' | 'avatar'>;

export type RegisterUser = Partial<Pick<User, 'firstName' | 'lastName'>> &
	Pick<User, 'email' | 'password' | 'gender' | 'dateOfBirth' | 'avatar'> & {
		confirmPassword: string;
	};
