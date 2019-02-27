import React from 'react';
import './BuildControls.scss'
import BuildControl from './BuildControl/BuildControl'

const ingredients = [
  {label: 'Cheese', type: 'cheese' },
  {label: 'Lettuce', type: 'lettuce' },
  {label: 'Bacon', type: 'bacon' },
  {label: 'Tomato', type: 'tomato' },
  {label: 'Meat', type: 'meat' }
]

const buildControlls = (props) => (

  <div className='BuildControls'>
    <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
    {ingredients.map((ingredient) => (
      <BuildControl
        key={ingredient.label}
        label={ingredient.label}
        added={() => props.ingredientAdded(ingredient.type)}
        removed={() => props.ingredientRemoved(ingredient.type)}
        disabled={props.disabled[ingredient.type]}/>
    ))}
    <button
      className='OrderButton'
      disabled={!props.purchasable}
      onClick={props.ordered}>
        {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default buildControlls
