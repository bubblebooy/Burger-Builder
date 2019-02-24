import * as actionTypes from './actionTypes'

const purchaseBurgerSuccess = (id,orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData: orderData,
  }
};
const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
};
const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_BURGER_START})
export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    fetch('https://react-my-burger-7c16f.firebaseio.com/order.json',{
      method: "POST",
      headers: {
            "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
    .then( response => response.json())
    .then( response => {
      dispatch(purchaseBurgerSuccess(response.name,orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error))
    })
  }
}

const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
});
const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
});
const featchOrdersStart = () => ({type: actionTypes.FETCH_ORDERS_START})
export const fetchOrders = () => {
  return dispatch => {
    dispatch(featchOrdersStart())
    fetch('https://react-my-burger-7c16f.firebaseio.com/order.json')
    .then( response => response.json())
    .then( response => {

      let orders = Object.entries(response)
        .map((order) => (
          {
            ...order[1],
            id: order[0],
          }
        ))
      dispatch(fetchOrdersSuccess(orders))
    })
    .catch(error => {
      dispatch(fetchOrdersFail(error))
    })
  }
}



export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT})
