import React from 'react';
import classes from './Modal.css';

const Modal = props => {
  const animationStyle = {
    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0'
  }

  return (
    <div className={classes.Modal} style={animationStyle}>
      {props.children}
    </div>
  )
}

export default Modal