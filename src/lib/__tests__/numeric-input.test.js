/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import SandpitForm from '../test/SandpitForm.svelte'
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { validate } from '../index.js';
describe('numeric inputs', () => {
  it('it returns an error if not a number', async () => {
    const data = {
      value: 'not a valid number'
    };
    const dataRules = {
      value: {
        rules: [
          {
            validate: 'numeric',
            message: 'The value must be a number'
          }
        ]
      }
    };
    const response = await validate(data, dataRules);
    expect(response.value[0]).toBe('The value must be a number');
  });

  it('it returns no errors if it is a number', async () => {
		const data = {
			value: 42
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'numeric',
						message: 'The value must be a number'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value.length).toBe(0);
	});
	it('it returns no errors if it is a float', async () => {
		const data = {
			value: 42.5
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'numeric',
						message: 'The value must be a number'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value.length).toBe(0);
	});
	it('it returns no errors if it is a negative number', async () => {
		const data = {
			value: -42.5
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'numeric',
						message: 'The value must be a number'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value.length).toBe(0);
	});

	it('it returns an error if not less than param', async () => {
		const data = {
			value: 42
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'lessThan|42',
						message: 'The value must be less than 42'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value[0]).toBe('The value must be less than 42');
	});

	it('it returns no errors if less than param', async () => {
		const data = {
			value: 41
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'lessThan|42',
						message: 'The value must be less than 42'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value.length).toBe(0);
	});

	it('it returns an error if not greater than param', async () => {
		const data = {
			value: 42
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'greaterThan|42',
						message: 'The value must be greater than 42'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value[0]).toBe('The value must be greater than 42');
	});

	it('it returns no errors if greater than param', async () => {
		const data = {
			value: 43
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'greaterThan|42',
						message: 'The value must be greater than 42'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value.length).toBe(0);
	});

	it('it returns an error if value is not an integer', async () => {
		const data = {
			value: 42.5
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'integer',
						message: 'The value must be an integer'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value[0]).toBe('The value must be an integer');
	});

	it('it returns no errors if the value is an integer', async () => {
		const data = {
			value: 42
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'integer',
						message: 'The value must be an integer'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value.length).toBe(0);
	});
	it('it returns an error if value is not a float', async () => {
		const data = {
			value: 42
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'float',
						message: 'The value must be a float'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value[0]).toBe('The value must be a float');
	});

	it('it returns no errors if the value is a float', async () => {
		const data = {
			value: 42.56
		};
		const dataRules = {
			value: {
				rules: [
					{
						validate: 'float',
						message: 'The value must be a float'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.value.length).toBe(0);
	});

})
