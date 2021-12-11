import validationRules from './rules';
export const validate = (data, dataRules) => {
  return new Promise((resolve, reject) => {
    const errors = {};

    for (const field in dataRules) {
      const rules = dataRules[field]['rules'];
      errors[field] = [];
      
      for (const rule in rules) {
        const result = validationRules[rules[rule]['validate']](data[field]);
        if (!result) {
          errors[field].push(rules[rule]['message']);
        }
      }

    }
    
    return resolve(errors);
  })
}
