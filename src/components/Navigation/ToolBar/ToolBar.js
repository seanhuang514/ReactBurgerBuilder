import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const ToolBar = props => (
  <header className={classes.toolBar}>
    <div>Menu</div>
    <Logo/>
    <nav><NavigationItems/></nav>
  </header>
)

export default ToolBar