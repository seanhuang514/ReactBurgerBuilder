import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const ToolBar = props => (
  <header className={classes.toolBar}>
    <DrawerToggle drawerToggle={props.drawerToggle}/>
    <div className={classes.logo}><Logo/></div>
    <nav className={classes.desktopOnly}><NavigationItems/></nav>
  </header>
)

export default ToolBar