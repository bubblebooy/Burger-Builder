import * as actionTypes from './actionTypes';

export const addIngredient    = (ingredientName) => ({type: actionTypes.ADD_INGREDIENT   , ingredientName: ingredientName});
export const removeIngredient = (ingredientName) => ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName});

const setIngredients = (ingredients) => ({type:actionTypes.SET_INGREDIENTS, ingredients:ingredients})
const fetchIngredientsFailed = (error) => ({type:actionTypes.FETCH_INGREDIENTS_FAILED, error:error})

export const initIngredients = () => {
  return dispatch => {
    fetch('https://react-my-burger-7c16f.firebaseio.com/ingredients.json')
    .then( response => response.json())
    .then( response => {
      if (response.error) throw response.error;
      dispatch(setIngredients(response))
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed(error))
    })
  };
}
