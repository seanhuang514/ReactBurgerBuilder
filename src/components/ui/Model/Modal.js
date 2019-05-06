import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux'
import BackDrop from '../BackDrop/BackDrop'

class Modal extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    /* if state change then re-render component and child component */
    return nextProps.show !== this.props.show
  }

  componentWillUpdate () {
    console.log('[Modal.js] - componentWillUpdate')
  }

  /* won't updated, this.props.show always false */
  // animationStyle = this.props.show

  render () {
    const animationStyle = {
      transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
    }

    return (
      <Aux>
        <BackDrop show={this.props.show} modalClose={this.props.modalClose}/>
        <div className={classes.Modal} style={animationStyle}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal