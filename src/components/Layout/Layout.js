import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  showSideDrawerHandle = () => {
    this.setState({ showSideDrawer: false })
  }

  drawerToggleHandler = () => {
    this.setState( prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render () {
    return (
      <Aux>
        <ToolBar drawerToggle={this.drawerToggleHandler}/>
        <SideDrawer show={this.state.showSideDrawer} closed={this.showSideDrawerHandle}/>
        <main className={ classes.content }>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout