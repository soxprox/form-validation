# form-validation

This library provides an easy way to validate your javascript and NodeJS applications. It's not only for form data, you can use it to validate any data.


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

## Supported rules are
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