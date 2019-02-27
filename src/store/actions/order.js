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

export const purchaseBurger = ( orderData, token ) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    const queryParams = `?auth=${token}`
    fetch(`https://react-my-burger-7c16f.firebaseio.com/order.json${queryParams}`,{
      method: "POST",
      headers: {
            "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
    .then( response => response.json())
    .then( response => {
      if (response.error) throw response.error
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

export const fetchOrders = (token , userId) => {
  return dispatch => {
    dispatch(featchOrdersStart())
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    fetch(`https://react-my-burger-7c16f.firebaseio.com/order.json${queryParams}`)
    .then( response => response.json())
    .then( response => {
      if (response.error) throw response.error;
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
