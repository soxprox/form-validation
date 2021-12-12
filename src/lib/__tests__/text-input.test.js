/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import SandpitForm from '../test/SandpitForm.svelte'
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { validate } from '../index.js';
describe('text inputs', () => {
  it('it returns an error if empty', async () => {
    const data = {
      name: ''
    };
    const dataRules = {
      name: {
        rules: [
          {
            validate: 'notEmpty',
            message: 'The name field is required'
          }
        ]
      }
    };
    const response = await validate(data, dataRules);
    expect(response.name[0]).toBe('The name field is required');
  });

  it('it returns no errors if it has a value', async () => {
		const data = {
			name: 'test data'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'notEmpty',
						message: 'The name field is required'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});
  it('it returns an error if not empty', async () => {
		const data = {
			name: 'test data'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'empty',
						message: 'The name field should be empty'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('The name field should be empty');
  });
  
  it('it tests multiple fields', async () => {
		const data = {
      firstName: '',
      lastName: 'Smith',
		};
		const dataRules = {
			firstName: {
				rules: [
					{
						validate: 'notEmpty',
						message: 'The first name field is required'
          },
				]
      },
      lastName: {
        rules: [
          {
            validate: 'empty',
            message: 'The last name field should be empty'
          }
        ]
      }
		};
    const response = await validate(data, dataRules);
    expect(response.firstName[0]).toBe('The first name field is required');
    expect(response.lastName[0]).toBe('The last name field should be empty');
  });
  
  it('it returns an error if maxlength is exceeded', async () => {
		const data = {
			name: 'test data'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'maxLength|5',
						message: 'The name field must be no longer than 5 characters'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('The name field must be no longer than 5 characters');
  });
  it('it returns no error if maxlength is not exceeded', async () => {
		const data = {
			name: 'test'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'maxLength|5',
						message: 'The name field must be no longer than 5 characters'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
  });
  
  it('it returns an error if data is less than minLength', async () => {
		const data = {
			name: 'test'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'minLength|5',
						message: 'The name field must be 5 characters or longer'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('The name field must be 5 characters or longer');
	});
	it('it returns no error if data is >= to minLength', async () => {
		const data = {
			name: 'test1'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'minLength|5',
						message: 'The name field must be no longer than 5 characters'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
  });
  
  it('it returns an error if data length is not equal to length', async () => {
		const data = {
			name: 'test'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'length|5',
						message: 'The name field must be 5 characters long'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('The name field must be 5 characters long');
  });
  
  it('it returns no error if data length is equal to length', async () => {
		const data = {
			name: 'test1'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'length|5',
						message: 'The name field must be 5 characters long'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});

})
