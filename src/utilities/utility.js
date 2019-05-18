import { fromJS } from 'immutable';

export const updateObject = (oldObject, updateProperties) => {
  return {
    ...oldObject,
    ...updateProperties
  };
};

export const immutableUpdateState = (oldState, nestedObject) => {
  return fromJS(oldState).mergeDeep(nestedObject).toJS();
}


export const checkValidity = (value, rules) => {
  let isValid = false;
  if(Object.keys(rules).length === 0) return true;

  if(rules.required) {
    isValid = value.trim() !== ''
  }

  if(rules.minLength) {
    // console.log(rule.minLength)
    isValid = value.length >= rules.minLength && isValid
  }

  if(rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }

  if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }

  return isValid;
}