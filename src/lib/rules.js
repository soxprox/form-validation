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
  }
}