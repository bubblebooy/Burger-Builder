import React from 'react';
import './Order.scss'

const order = (props) => {
  const ingredients = Object.entries(props.ingredients).map((ingredient) => {
    return (ingredient[1] ? `${ingredient[0]} (${ingredient[1]}) ` : null)
  }).filter( n => n)
  return (
    <div className='Order'>
      <p> Ingredients: {ingredients.join(', ')} </p>
      <p> Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default order;
