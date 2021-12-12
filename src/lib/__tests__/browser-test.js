/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import SandpitForm from '../test/SandpitForm.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';

describe('testing functionality of browser', () => {
  it('displays error when text input is too short', async () => {
    render(SandpitForm);
    const nameInput = screen.getByLabelText('Name')
    const button = screen.getByRole('button');
    userEvent.type(nameInput, 'a');
    await userEvent.click(button);
    await waitFor(() => {
			expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument();
    })
  })
})
