import validationRules from './rules';
export const validate = (data, dataRules) => {
  return new Promise((resolve, reject) => {
    const errors = {};

    for (const field in dataRules) {
      const rules = dataRules[field]['rules'];
      errors[field] = [];
      
      for (const rule in rules) {
        //First element of funcArgs will be the function name to call
        //The remaining will be arguments to pass to the function
        const funcArgs = rules[rule]['validate'].split('|');
        const result = validationRules[funcArgs[0]](data[field], funcArgs);
        if (!result) {
          errors[field].push(rules[rule]['message']);
        }
      }

    }
    
    return resolve(errors);
  })
}
