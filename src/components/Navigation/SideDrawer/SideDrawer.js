import React from 'react'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.scss'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let sideDrawerClasses = ['SideDrawer','Close']
  if (props.open) {
    sideDrawerClasses = ['SideDrawer','Open']
  }
  return (
    <>
      <Backdrop
      show={props.open}
      clicked={props.closed}/>
      <div className={sideDrawerClasses.join(' ')}>
        <Logo />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
