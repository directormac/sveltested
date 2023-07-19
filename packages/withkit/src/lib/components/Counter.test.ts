import { cleanup, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.svelte';
import { expect } from 'vitest';

describe('Test Counter.svelte', async () => {
	const user = userEvent.setup();
	let increaseButton: HTMLElement,
		decreaseButton: HTMLElement,
		resetButton: HTMLElement,
		count: HTMLElement;
	beforeEach(() => {
		render(Counter);
		increaseButton = screen.getByLabelText('Increment Button');
		decreaseButton = screen.getByLabelText('Decrease Button');
		resetButton = screen.getByLabelText('Reset Button');
		count = screen.getByLabelText('Count');
	});
	afterEach(() => {
		cleanup();
	});
	it('Initial counter should be 0', async () => {
		expect(screen.getByText('0')).toBeInTheDocument();
	});
	it('Should Increment Counter by 3', async () => {
		await user.click(increaseButton);
		await user.click(increaseButton);
		await user.click(increaseButton);
		expect(count).toHaveTextContent('3');
	});
	it('Should Decrement Counter by 5', async () => {
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		expect(count).toHaveTextContent('-5');
	});
	it('Should Reset Counter to 0', async () => {
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(decreaseButton);
		await user.click(increaseButton);
		await user.click(resetButton);
		expect(count).toHaveTextContent('0');
	});
});
