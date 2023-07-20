import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import HybridForm from './HybridForm.svelte';
describe('HybridForm', async () => {
	it('Should render login on initialized', async () => {
		render(HybridForm);
	});
});
