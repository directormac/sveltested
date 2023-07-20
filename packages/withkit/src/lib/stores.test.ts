import { get } from 'svelte/store';
import { currentUser } from './stores';
import type { User } from './types';
import { expect } from 'vitest';

describe('Basic Users store', () => {
	afterEach(() => {});

	const newUser: User = {
		email: 'test@test.com',
		password: 'password',
		firstName: 'Jose',
		lastName: 'Rizal',
		gender: 'MALE',
		dateOfBirth: new Date('1861-06-19'),
		avatar: 'https://api.dicebear.com/6.x/pixel-art/svg?seed=John'
	};

	it('User should be null on initialized', () => {
		const value = get(currentUser);
		expect(value).toEqual(null);
	});

	it('Should be able to register a user', () => {
		currentUser.set(newUser);
		const value = get(currentUser);
		expect(value).toEqual(newUser);
	});

	it('Should be able to update a user', () => {
		const updatedUser: User = {
			...newUser,
			firstName: 'Jose Protasio'
		};

		currentUser.update((user) => {
			if (user) {
				user.firstName = 'Jose Protasio';
				return user;
			}
			return user;
		});
		const value = get(currentUser);
		console.log(value);
		expect(value).toEqual(updatedUser);
	});
});
