import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.scss'

const navigationItems = (props) => {
  let auth = <NavigationItem link="/auth">Authenticate</NavigationItem>
  if (props.isAuthenticated) {
    auth = (
      <>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </>
    )
  }
  return (
    <ul className='NavigationItems'>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>
      {auth}
    </ul>
  )
}

export default navigationItems;
