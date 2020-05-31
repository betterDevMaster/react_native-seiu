import validatejs from 'validate.js';

export default validate = (attributes, rules) => {
  let validationErrors = validatejs(attributes, rules);
  if (validationErrors) {
    let result = {};
    for (var key in attributes) {
      result[key] =
        validationErrors && validationErrors[key]
          ? validationErrors[key][0]
          : '';
    }
    return result;
  }
  return null;
};
