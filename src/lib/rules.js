export const validationRules = {
  notEmpty(value, args) {
    return !!value.trim();
  },
  empty(value, args) {
    return !value.trim();
  },
  maxLength(value, args) {
    if (value.length > args[1]) {
      return false;
    }
    return true;
  },
  minLength(value, args) {
    if (value.length < args[1]) {
      return false;
    }
    return true;
  },
  length(value, args) {
    if (value.length != args[1]) {
      return false;
    }
    return true;
  },

  lengthBetween(value, args) { 
    if (value.length >= args[1] && value.length <= args[2]) {
      return true;
    }
    return false
  },

  equal(value, args) { 
    if (value == args[1]) {
      return true;
    }
    return false
  },

  notEqual(value, args) {
    if (value != args[1]) { 
      return true;
    }
    return false;
  }
}