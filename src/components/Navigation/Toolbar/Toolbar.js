import React from 'react';
import './Toolbar.scss'
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className='Toolbar'>
    <button className='MenuButton' onClick={props.menuClicked}>Menu</button>
    <Logo/>
    <nav className='DesktopOnly'>
      <NavigationItems/>
    </nav>
  </header>
);

export default toolbar
