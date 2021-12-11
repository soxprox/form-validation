/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import SandpitForm from '../test/SandpitForm.svelte'
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

describe('form components required for testing exist', () => {
  it('has form components', () => {
    render(SandpitForm);
    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toBeInTheDocument();
  })
})