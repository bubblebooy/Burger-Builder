import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'
import './Logo.scss'

const logo = (props) => (
  <div className='logo'>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
)

export default logo;
