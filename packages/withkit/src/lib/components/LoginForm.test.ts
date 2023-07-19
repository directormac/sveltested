import { cleanup, render, screen } from '@testing-library/svelte';
import LoginForm from './LoginForm.svelte';
import userEvent from '@testing-library/user-event';

describe('Test LoginForm.svelte', async () => {
	const user = userEvent.setup();
	let emailInput: HTMLElement, passwordInput: HTMLElement, loginButton: HTMLButtonElement;
	beforeEach(() => {
		render(LoginForm);
		emailInput = screen.getByLabelText('Email Input');
		passwordInput = screen.getByLabelText('Password Input');
		loginButton = screen.getByLabelText('Login Button');
	});
	afterEach(() => {
		cleanup();
	});
	it('Should require email and password', async () => {
		expect(emailInput).toBeRequired();
		expect(passwordInput).toBeRequired();
	});

	it('Should have disabled button on initial render', async () => {
		expect(loginButton).toBeDisabled();
	});

	it('Should have disabled button on valid email input', async () => {
		await user.type(emailInput, 'email@email.com');
		expect(emailInput).toBeValid();
		expect(loginButton).toBeDisabled();
	});

	it('Should have enabled button on valid email and password input', async () => {
		await user.type(emailInput, 'email@email.com');
		await user.type(passwordInput, 'password');
		expect(emailInput && passwordInput).toBeValid();
		expect(loginButton).toBeEnabled();
	});

	it('Should dispatch submit', async () => {
		cleanup(); // called cleanup for fresh render
		// Initiliaze component with props only works if props are declared as export
		const { getByLabelText, component } = render(LoginForm);
		await user.type(getByLabelText('Email Input'), 'email@email.com');
		await user.type(getByLabelText('Password Input'), 'password');

		const dispatch = vi.fn((event) => ({
			email: event.detail.email,
			password: event.detail.password
		}));
		component.$on('submit', dispatch);
		// Click Submit button
		await user.click(getByLabelText('Login Button'));
		expect(dispatch).toHaveBeenCalled();
	});
});
