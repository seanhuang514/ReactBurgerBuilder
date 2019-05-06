import React from 'react';
import classes from '../BackDrop/BackDrop.css'

const BackDrop = props => (
  props.show ? <div className={classes.backdrop} onClick={props.modalClose}/> : null
)

export default BackDrop