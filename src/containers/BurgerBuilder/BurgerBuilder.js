import React , {Component} from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/' // can leave out index.js

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount () {
    this.props.onIngredientsInitialized()
    // fetch('https://react-my-burger-7c16f.firebaseio.com/ingredients.json')
    // .then( response => response.json())
    // .then( response => {
    //   this.setState({ingredients: response})
    // })
    // .catch(error => {
    //   console.log("error",error)
    // })
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type] ;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = oldCount + 1;
  //   const oldPrice = this.state.totalPrice
  //   this.setState({ingredients: updatedIngredients,totalPrice: oldPrice + INGREDIENT_PRICES[type]})
  //   this.updatePurchaseState(updatedIngredients)
  // }
  //
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type] ;
  //   if (oldCount > 0){
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = oldCount - 1;
  //     const oldPrice = this.state.totalPrice
  //     this.setState({ingredients: updatedIngredients,totalPrice: oldPrice - INGREDIENT_PRICES[type]})
  //     this.updatePurchaseState(updatedIngredients)
  //   }
  // }

  updatePurchaseState () {
    const sum = Object.keys(this.props.ingredients)
      .map(igKey => {
        return this.props.ingredients[igKey]
      }).reduce((sum, el) => sum + el,0)
      return sum > 0
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    // alert('You continue!');
    // const queryParams = [];
    // for (let i in this.props.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
    // }
    // queryParams.push('price=' + this.props.totalPrice);
    // const queryString = queryParams.join('&');
    this.props.onInitPurchase()
    this.props.history.push({
      pathname: '/checkout',
    })
  }


  render () {
    const disabledInfo = {
      ...this.props.ingredients
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = <Spinner/>
    if (this.props.ingredients) {
      orderSummary = <OrderSummary
        ingredients = {this.props.ingredients}
        price = {this.props.totalPrice}
        cancelClicked = {this.purchaseCancelHandler}
        continueClicked = {this.purchaseContinueHandler} /> ;
      burger = (
        <>
          <Burger ingredients = {this.props.ingredients}/>
          <BuildControls
            ingredientAdded   = {this.props.onIngredientAdded}//{this.addIngredientHandler}
            ingredientRemoved = {this.props.onIngredientRemoved}//{this.removeIngredientHandler}
            disabled          = {disabledInfo}
            purchasable       = {this.updatePurchaseState()}
            ordered           = {this.purchaseHandler}
            price={this.props.totalPrice}/>
        </>
      )
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
        </Modal>
        { burger }
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded:   (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    onIngredientsInitialized: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(BurgerBuilder);
