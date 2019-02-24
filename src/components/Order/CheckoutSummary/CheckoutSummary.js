import React from 'react';

import Burger from '../../Burger/Burger';
import './CheckoutSummary.scss'

const checkoutSummary = (props) => {
  return (
    <div className='CheckoutSummary'>
      <h1>We hope it tast well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <button className='Button Danger'   onClick={props.checkoutCancelled} > CANCEL   </button>
      <button className='Button Success'  onClick={props.checkoutContinued} > CONTINUE </button>
    </div>
  )
}

export default checkoutSummary;
