import React, { Component } from 'react';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return <li key={igKey}>
        <span style={{ textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
        </li>
    })
    return (
      <>
        <h3>Your Order</h3>
        <p>A delictios burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <button className='Button Danger'   onClick={this.props.cancelClicked}   > CANCEL   </button>
        <button className='Button Success'  onClick={this.props.continueClicked} > CONTINUE </button>
      </>
    )
  }
}
//
// const orderSummary = (props) => {
//
//
// };

export default OrderSummary;
