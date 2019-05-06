import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux'
import BackDrop from '../BackDrop/BackDrop'

const Modal = props => {
  const animationStyle = {
    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0'
  }

  return (
    <Aux>
      <BackDrop show={props.show} modalClose={props.modalClose}/>
      <div className={classes.Modal} style={animationStyle}>
        {props.children}
      </div>
    </Aux>
  )
}

export default Modal