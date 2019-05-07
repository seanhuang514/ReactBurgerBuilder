import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../ui/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux/Aux'

const SideDrawer = props => {
  let attachedClasses = [classes.sideDrawer, classes.close]
  if(props.show) attachedClasses = [classes.sideDrawer, classes.open]

  return (
    <Aux>
      <BackDrop show={props.show} modalClose={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.logo}><Logo/></div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;