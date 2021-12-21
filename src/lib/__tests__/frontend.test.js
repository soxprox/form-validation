/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import SandpitForm from '../test/SandpitForm.svelte';
import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { validate } from '../index.js';

describe('front end testing', () => {
	it('updates error message as user types', async () => {
		render(SandpitForm);
		const input = screen.getByLabelText('Email');
		await userEvent.type(input, 'john');
		await waitFor(() => {
			expect(screen.getByText('Email should be valid')).toBeInTheDocument();
		});
	});
	it('Updates the form field with an error message', async () => { 
		render(SandpitForm);
		const input = screen.getByLabelText('Age');
		await userEvent.type(input, '16');
		await waitFor(() => {
			expect(screen.getByText('Minimum age 18')).toBeInTheDocument();
		});
	})
});
