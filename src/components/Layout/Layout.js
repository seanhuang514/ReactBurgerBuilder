import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';

const Layout = (props) => {
  return (
    <Aux>
      <ToolBar/>
      <main className={ classes.content }>
        {props.children}
      </main>
    </Aux>
  )
}

export default Layout