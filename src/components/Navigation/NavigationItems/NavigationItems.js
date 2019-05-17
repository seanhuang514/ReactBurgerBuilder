import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'
import { connect } from 'react-redux'

const NavigationItems = props => (
  <ul className={classes.navigationItems}>
    <NavigationItem link='/'>Burger Builder</NavigationItem>
    <NavigationItem link='/orders'>Orders</NavigationItem>
    { props.isAuthenticate ? <NavigationItem link='/auth'>Logout</NavigationItem> : <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    
  </ul>
);

const mapStateToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(NavigationItems);