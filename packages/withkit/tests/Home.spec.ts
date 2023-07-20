import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('Should Have Title Home', async ({ page }) => {
	await expect(page).toHaveTitle('Home');
});

test('Home page should render with h1', async ({ page }) => {
	await expect(
		page.getByRole('heading', { name: 'Welcome to testing with SvelteKit' })
	).toBeVisible();
});

test('Should Increment count', async ({ page }) => {
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await expect(page.getByLabel('Count')).toContainText('7');
});
test('Should Decrement count', async ({ page }) => {
	await page.getByLabel('Decrement Button').click();
	await page.getByLabel('Decrement Button').click();
	await page.getByLabel('Decrement Button').click();
	await page.getByLabel('Decrement Button').click();
	await expect(page.getByLabel('Count')).toContainText('-4');
});
test('Should Reset count', async ({ page }) => {
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Increment Button').click();
	await page.getByLabel('Decrement Button').click();
	await page.getByLabel('Reset Button').click();
	await expect(page.getByLabel('Count')).toContainText('0');
});

test('Should Login', async ({ page }) => {
	await page.getByLabel('Email Input').type('test@test.com');
	await page.getByLabel('Password Input').type('password');
	await page.getByLabel('Login Button').click();
});
