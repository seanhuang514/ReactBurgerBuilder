import React from 'react';
import classes from './Button.css';

const Button = props => {
  const dynamicClass = [classes.Button, classes[props.btnType]].join(' ');

  return (
    <button 
      onClick={props.clicked}
      className={dynamicClass}>
      {props.children}
    </button>
  )
}

export default Button