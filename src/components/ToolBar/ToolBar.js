import React from 'react';
import classes from './ToolBar.css';
import Logo from '../Logo/Logo';

const ToolBar = props => (
  <header className={classes.toolBar}>
    <div>Menu</div>
    <Logo/>
    <nav>...</nav>
  </header>
)

export default ToolBar