import React from 'react';
import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';

import './Modal.css';

const modal = (props) => {
  const dynamicClasses = (state) => {
    let classes = ['Modal'];

    if(state === 'entering') {
      classes.push('ModalOpen')
    }else if(state === 'exiting'){
      classes.push('ModalClose')
    }

    return classes.join(' ')
  }

  const animationTiming = {
    enter: 400,
    exit: 1000
  }

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames="myAni">
      
      <div className="Modal">
          <h1>A Modal</h1>
          <button className="Button" onClick={props.closed}>Dismiss</button>
      </div>
    </CSSTransition>
    /* 
    
    <Transition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      onEnter={() => console.log('onEnter')}
      onEntering={() => console.log('onEntering')}
      onEntered={() => console.log('onEntered')}
      onExit={() => console.log('onExit')}
      onExiting={() => console.log('onExiting')}
      onExited={() => console.log('onExited')}
      >
      {state => (
        <div className={dynamicClasses(state)}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
      )}
    </Transition>
    */
  )
};

export default modal;