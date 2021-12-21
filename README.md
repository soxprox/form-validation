# form-validation

This library provides an easy way to validate your javascript applications data. There is also the option to automatically update forms with generated error messages.

## Installation

npm install @soxprox/form-validation

## Getting started

```
import { validate } from "@soxprox/form-validation"

const data = {
  password: "1234567"
}

const dataRules = {
  password: {
    rules: [
      {
        validate: 'minLength|8',
        message: 'The password should be a minumum of 8 Characters long'
      }],
        updateDom: true,
        fieldId: 'password',
        displayAllErrors: true
  }
}

const result = validationRules(data, dataRules)
```
## How to use
To validate your data import 'validate' from the library

```
import { validate } from "@soxprox/form-validation"
```

`validate` takes 2 arguments

1. An data object containing the data to be validated
2. A rules object containing rules and instructions on how to validate the data and display an errors

The rules object should have property names that match the names of the properties in the data object.

Each rules property requires one property of type array called `rules`. The rules array should contain one object for each validation that is to be applied

Each validation object requires 2 properties.

1. Validation Rule
2. Error message if the rule fails the verification

``` js
let dataRules = {
  age: {
    rules: [
      {
        validate: 'greaterThan|17',
        message: 'You need to be at least 18 years old'
      },
      {
        validate: 'lessThan|100',
        message: 'You need to be less than 100 years old'
      }
    ]
  }
}
```

You have a choice to simply validate the data and return any errors as an array that you can handle and display yourself, or you can have the library populate the form with errors under each relevant field.

### Example
Given the following data

``` js
let age = 101;
let name = 'Simon'
```

You have a few options for validation.

1. Validate all fields

``` js
let result = validate({ age, name }, dataRules)
```

2. Validate one or more fields

``` js
let result = validate({ age }, dataRules)
```

> The number of data rule does not need to match the number of data elements, only that a rule exists for those data elements that are provided.




The `result` is an object containing the properties passed in `data` with the value of each property being an array or string error messages.

In the example above the result would be 

```
{
  age: ['You need to be less than 100 years old']
}
```

If the data passed all the rules, then the property array will be empty

```
{
  age: []
}
```
If the length of the array is `0`, all the rules passed.

## Supported rules

### **alpha**
Checks that the value provide contains only characters a-zA-Z

### **string**
Checks that the value provided is of type string
### **empty**
Checks that the value is not empty or null

### **notEmpty**
Checks that the value is empty or null

### **minLength|`int`**
Checks the string length is greater or equal to the param provided
### **maxLength|`int`**
Checks the string length is less or equal to the param provided

### **length|`int`**
Checks the string length matches the param provided
### **lengthBetween|`<min>int`|`<max>int`**
Checks the string length is between the two params provided
### **equal|`string`**
Check that the value provided is equal to the param
### **notEqual|`string`**
Check that the value provided is not equal to the param
### **inArray|`value`,`value`,`value`....**
The array to validate against will be built up from the values supplied. Each value should be separated by a `,` (comma).

### **notInArray|`value`,`value`,`value`....**
The array to validate against will be built up from the values supplied. Each value should be separated by a `,` (comma).

### **inRegex|`regular expression`**
The regular expression **should not** be surrounded with `/`

**Example**

The following will validate that me@me.com contains an `@` symbol

```
inRegex|.?@.?
```

### **notInRegex|`regular expression`**
The regular expression **should not** be surrounded with `/`

Validates that the value is **not** matched by the regular expression

### **includesAllWords|`string`,`string`...**
Returns an error if the value does not include all the words in the array

### **doesNotIncludeWords|`string`,`string`...**
Return an error if the value includes any of the words in the array

## URL and Email validation

### **url**
Checks that the URL is valid using the following regex

```
^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$
```
Both of the following urls would be valid

* https://www.google.com
* https://www.google.com?key=value&key2=value2

### **email**
Checks that the email address is in a valid format. It does more than just check that a `@` symbol exists.

The following `would not` validate as a correct email address

```
name@domain
```
### **number**
Checks that the value passed in is a valid number

### **integer**
Checks that the value passed is an integer

### **float**
Checks that the value passed is a float

### **lessThan|`number`**
Checks that the value is less than the number provided in the parameter

### **greaterThan|`number`**
Checks that the value is greater than the number provided in the parameter

## Example of using the library in svelte

```
<script>
  import { validate } from '../index.js';
  let name='';
  let email='';
  let errors = {
    name: [],
    email: [],
  }

  const dataRules = {
      name: {
        rules: [
          {
            validate: 'minLength|3',
            message: 'Name must be at least 3 characters'
          }
        ]
      },
      email: {
        rules: [
          {
            validate: 'email',
            message: 'Email should be valid'
          }
        ]
      }
    };

  let onKeyUp = async () => {
    errors = await validate({ email }, dataRules);
  }

  let onClick = async () => {
    errors = await validate({ email, name }, dataRules);
  }
</script>
<h1>Sandpit Test Form</h1>

<div>
  <label for="name">Name</label>
  <input type="text" id="name" bind:value={name}>
  {#if errors.name}
  {#each errors.name as error}
    <div>{error}</div>
  {/each}
  {/if}
</div>
<div>
  <label for="email">Email</label>
  <input type="text" id="email" on:keyup={onKeyUp} bind:value={email}>
  {#if errors.email}
  {#each errors.email as error}
    <div>{error}</div>
  {/each}
  {/if}
</div>
<div>
  <button on:click={onClick}>Submit</button>
</div>
```