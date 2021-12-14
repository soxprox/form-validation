import { validationRules } from './rules';
export const validate = (data, dataRules) => {
  return new Promise((resolve, reject) => {
    const errors = {};
    try {
      for (const field in dataRules) {
        //Check if data has field
        if (data[field] === undefined) {
          continue;
        }
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
    } catch (error) {
      if (error !== 'TypeError: value is undefined') {
        return reject('Error: ' + error);
      }
    }
    return resolve(errors);
  })
}
