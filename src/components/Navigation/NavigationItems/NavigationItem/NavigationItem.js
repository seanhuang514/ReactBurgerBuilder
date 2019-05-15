import React from 'react';
import classes from './NavigationItem'
import { NavLink } from 'react-router-dom';

const NavigationItem = props => (
  <li className={classes.navigationItem}>
    <NavLink exact to={props.link} activeClassName={classes.active} >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;