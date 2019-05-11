import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => (
  <ul className={classes.navigationItems}>
    <NavigationItem link='/' active>Burger Builder</NavigationItem>
    <NavigationItem link='/checkout'>CheckOut</NavigationItem>
  </ul>
);

export default NavigationItems;