import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  showSideDrawerHandle = () => {
    this.setState({ showSideDrawer: false })
  }

  render () {
    return (
      <Aux>
        <ToolBar/>
        <SideDrawer show={this.state.showSideDrawer} closed={this.showSideDrawerHandle}/>
        <main className={ classes.content }>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout