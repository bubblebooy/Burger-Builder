import React, { Component } from 'react';
import './Layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  }

  render() {
    return (
      <>
        <Toolbar menuClicked={this.sideDrawerOpenHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <div>Toolbar, SideDrawer, Backdrop</div>

        <main>
          {this.props.children}
        </main>
      </>
    )
  }
}

export default Layout;
