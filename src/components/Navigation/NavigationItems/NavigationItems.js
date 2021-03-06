import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'
import { connect } from 'react-redux'

export const NavigationItems = props => (
  <ul className={classes.navigationItems}>
    <NavigationItem link='/'>Burger Builder</NavigationItem>
    { props.isAuthenticate ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
    { props.isAuthenticate
        ? <NavigationItem link='/Logout'>Logout</NavigationItem>
        : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    
  </ul>
);

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(NavigationItems);