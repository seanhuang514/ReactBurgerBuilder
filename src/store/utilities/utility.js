import { Map, fromJS } from 'immutable';

export const updateObject = (oldObject, updateProperties) => {
  return {
    ...oldObject,
    ...updateProperties
  };
};

export const immutableUpdateState = (oldState, nestedObject) => {
  return fromJS(oldState).mergeDeep(nestedObject).toJS();
}
