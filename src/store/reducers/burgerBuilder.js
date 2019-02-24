import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const INGREDIENT_PRICES = {
  cheese: 0.5,
  lettuce: 0.0,
  bacon: 0.75,
  tomato: 0.0,
  meat: 1.3,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] > 0 ? state.ingredients[action.ingredientName] - 1 : 0
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients:action.ingredients,
        error: false,
        totalPrice: initialState.totalPrice,
      }
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      console.log(`ERROR: ${action.error}`);
      return {
        ...state, error: true
      }
    default:
      return state;
  }
}

export default reducer;
