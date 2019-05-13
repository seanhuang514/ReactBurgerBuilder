import React from 'react';
import classes from './Input.css';

const Input = props => {
  let inputElement = null;
  let inputClasses = [classes.inputElement]
  let validationError = null;

  if(props.invalid && props.validation && props.touched) {
    inputClasses.push(classes.invalid)
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
          {props.elementConfig.option.map(option => {
            return <option key={option.value} value={option.value}>{option.displayValue}</option>;
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={classes.input}>
      <label className={classes.label} htmlFor="">
        {props.label}
      </label>
      {validationError}
      {inputElement}
    </div>
  );
};

export default Input;
