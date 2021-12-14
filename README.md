# form-validation

This library provides an easy way to validate your javascript applications.


## Installation

npm install @soxprox/form-validation

## Getting started

```
import validationRules from "@soxprox/form-validation"

const data = {
  password: "1234567"
}

const dataRules = {
  password: {
    rules: [
      {
        validate: 'minLength|8',
        message: 'The password should be a minumum of 8 Characters long'
      }]
  }
}

const result = validationRules(data, dataRules)
```

The `result` is an object containing the properties passed in `data` with the value of each property being an array.

In the example above the result would be 

```
{
  password: ['The password should be a minumum of 8 Characters long']
}
```

If the data passed the rules, then the array will be empty

```
{
  password: []
}
```
If the length of the array is `0`, all the rules passed.

## Supported rules
### **empty**

Checks that the the data property evaluates to false.

- String must be zero length (uses trim)
- Arrays must be zero length

Note: Currently this does not work for objects. Evan an empty object `{}` will evaluate to true. This will be fixed in a later versions 

### **notEmpty**

Checks that the data property evaluates to true

- String must not be zero length (uses trim)
- Arrays must have at least one element
- If the data property is an object (even an empty object) it will return no error. This will be fixed in a later version 

### **minLength|`int`**

### **maxLength|`int`**

### **length|`int`**

### **lengthBetween|`int`|`int`**

### **equal|`string`**

### **notEqual|`string`**

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

### **lessThan|`number`**
Checks that the value is less than the number provided in the parameter

### **greaterThan|`number`**
Checks that the value is greater than the number provided in the parameter