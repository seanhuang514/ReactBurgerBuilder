import React from 'react';
import Transition from 'react-transition-group/Transition';

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

  return (
    <Transition  mountOnEnter unmountOnExit in={props.show} timeout={400}>
      {state => (
        <div className={dynamicClasses(state)}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
      )}
    </Transition>
  )
};

export default modal;