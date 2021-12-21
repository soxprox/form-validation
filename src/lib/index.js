import { validationRules } from './rules';
import { updateDocument } from './updateDocument';
export const validate = (data, dataRules) => {
  return new Promise((resolve, reject) => {
    let errors = {};
    let errorCount = 0;
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
            errorCount += 1;
            errors[field].push(rules[rule]['message']);
          }
        }
        if (dataRules[field]['updateDom']) {
          updateDocument(
						dataRules[field]['fieldId'] || field,
						errors[field],
						dataRules[field]['displayAllErrors']
					);
        }

      }
    } catch (error) {
      if (error !== 'TypeError: value is undefined') {
        return reject('Error: ' + error);
      }
    }
    if (errorCount > 0) {
      errors['spErrorCount'] = errorCount;
      errors['spErrors'] = true
    } else {
      errors['spErrorCount'] = 0;
			errors['spErrors'] = false;
    }
    return resolve(errors);
  })
}
