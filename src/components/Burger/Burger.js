import React from 'react'
import './Burger.scss'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_,i) => {
        return <BurgerIngredient key={igKey + i} type={igKey}/>
      });
    })
    .reduce((arr,el) => {
      return arr.concat(el)
    }, []);
    if (ingredients.length ===0 ) {
      ingredients = <p> Please Start Adding Ingredients </p>
    }
  return (
    <div className="burger">
      <BurgerIngredient type='bread-top'/>
      {ingredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default burger;
