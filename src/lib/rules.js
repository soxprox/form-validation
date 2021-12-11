const rules = {
  notEmpty(value) {
    return !!value.trim();
  },
  empty(value) {
    return !value.trim();
  }
}

export default rules;