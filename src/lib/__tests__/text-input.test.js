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

	it('it returns error if length is not between two values', async () => {
		const data = {
			name: 'test1'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'lengthBetween|6|8',
						message: 'The name field should be between 5 and 8 characters long'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('The name field should be between 5 and 8 characters long');
	});

		it('it returns no error if length is between two values', async () => {
			const data = {
				name: 'test12'
			};
			const dataRules = {
				name: {
					rules: [
						{
							validate: 'lengthBetween|6|8',
							message: 'The name field should be between 5 and 8 characters long'
						}
					]
				}
			};
			const response = await validate(data, dataRules);
			expect(response.name.length).toBe(0);
		});

		it('it returns error if value is not equal', async () => {
			const data = {
				name: 'test1'
			};
			const dataRules = {
				name: {
					rules: [
						{
							validate: 'equal|test2',
							message: 'The value of name should be equal to test2'
						}
					]
				}
			};
			const response = await validate(data, dataRules);
			expect(response.name[0]).toBe('The value of name should be equal to test2');
		});

		it('it returns no error if the value is equal', async () => {
			const data = {
				name: 'test2'
			};
			const dataRules = {
				name: {
					rules: [
						{
							validate: 'equal|test2',
							message: 'The value of name should be equal to test2'
						}
					]
				}
			};
			const response = await validate(data, dataRules);
			expect(response.name.length).toBe(0);
		});

		it('it returns error if value is equal', async () => {
			const data = {
				name: 'test1'
			};
			const dataRules = {
				name: {
					rules: [
						{
							validate: 'notEqual|test1',
							message: 'The value of name should not equal test1'
						}
					]
				}
			};
			const response = await validate(data, dataRules);
			expect(response.name[0]).toBe('The value of name should not equal test1');
		});

		it('it returns no error if the value is not equal', async () => {
			const data = {
				name: 'test2'
			};
			const dataRules = {
				name: {
					rules: [
						{
							validate: 'notEqual|test1',
							message: 'The value of name should not equal test1'
						}
					]
				}
			};
			const response = await validate(data, dataRules);
			expect(response.name.length).toBe(0);
		});

		it('it returns error if value is not in the array', async () => {
			const data = {
				name: 'test1'
			};
			const dataRules = {
				name: {
					rules: [
						{
							validate: 'inArray|test2,test3,test4',
							message: 'Name should be one of the following values: test2, test3, test4'
						}
					]
				}
			};
			const response = await validate(data, dataRules);
			expect(response.name[0]).toBe('Name should be one of the following values: test2, test3, test4');
		});

		it('it returns no error if the value is in the array', async () => {
			const data = {
				name: 'test4'
			};
			const dataRules = {
				name: {
					rules: [
						{
							validate: 'inArray|test1,test2,test3,test4',
							message: 'Name should be one of the following values: test1, test2, test3, test4'
						}
					]
				}
			};
			const response = await validate(data, dataRules);
			expect(response.name.length).toBe(0);
		});
	
	it('it returns error if value is in the array', async () => {
		const data = {
			name: 'test1'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'notInArray|test1,test2,test3,test4',
						message: 'Name should not be one of the following values: test1, test2, test3, test4'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe(
			'Name should not be one of the following values: test1, test2, test3, test4'
		);
	});

	it('it returns no error if name is not in the array', async () => {
		const data = {
			name: 'test4'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'notInArray|test1,test2,test3',
						message: 'Name should not be one of the following values: test1, test2, test3, test4'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});

	it('it returns error if value is not matched in regex', async () => {
		const data = {
			name: 'me-at-me.com'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'inRegex|.?@.?',
						message: 'Name should include a @ sign'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('Name should include a @ sign');
	});

	it('it returns no error if value is matched in regex', async () => {
		const data = {
			name: 'me@me.com'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'inRegex|.?@.?',
						message: 'Name should include a @ sign'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});

	it('it returns error if value is matched in regex', async () => {
		const data = {
			name: 'me@me.com'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'notInRegex|.?@.?',
						message: 'Name should not include an @ sign'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('Name should not include an @ sign');
	});

	it('it returns no error if value is not matched in regex', async () => {
		const data = {
			name: 'me-at-me.com'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'notInRegex|.?@.?',
						message: 'Name should not include a @ sign'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});

	it('it returns error if value does not include words', async () => {
		const data = {
			name: 'Mary had a little lamb'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'includesAllWords|dell,rodney',
						message: 'Name should include words: Dell, Rodney'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('Name should include words: Dell, Rodney');
	});

	it('it returns no error if value does include words', async () => {
		const data = {
			name: 'Dell had a brother called Rodney'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'includesAllWords|dell,rodney',
						message: 'Name should include words: Dell, Rodney'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});

	it('it returns error if value include words', async () => {
		const data = {
			name: "Rodney is Dell's brother"
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'doesNotIncludeWords|dell,rodney',
						message: 'Name should not include words: Dell, Rodney'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('Name should not include words: Dell, Rodney');
	});

	it('it returns no error if value does not include words', async () => {
		const data = {
			name: 'Mary had a little lamb'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'doesNotIncludeWords|dell,rodney',
						message: 'Name should not include words: Dell, Rodney'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});

	it('it returns an error if value is not a valid URL', async () => {
		const data = {
			name: "http://notvalid"
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'isValidURL',
						message: 'Name should be a valid URL'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name[0]).toBe('Name should be a valid URL');
	});

	it('it returns no error if value is a valid URL', async () => {
		const data = {
			name: 'https://www.google.com?key=value&key2=value2'
		};
		const dataRules = {
			name: {
				rules: [
					{
						validate: 'isValidURL',
						message: 'Name should be a valid URL'
					}
				]
			}
		};
		const response = await validate(data, dataRules);
		expect(response.name.length).toBe(0);
	});

})
