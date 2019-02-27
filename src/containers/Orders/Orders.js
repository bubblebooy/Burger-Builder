import React, { Component } from 'react';
//import './Orders.scss'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/' // can leave out index.js
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  state = {
  }
  componentDidMount () {
    console.log(this.props.userId);
    this.props.onFetchOrders(this.props.token,this.props.userId)
    // fetch('https://react-my-burger-7c16f.firebaseio.com/order.json')
    // .then( response => response.json())
    // .then( response => {
    //   this.setState({orders: response , loading: false})
    // })
    // .catch(error => {
    //   console.log("error",error)
    // })
  }
  render () {
    let orders = null
    if (this.props.orders) {
      orders = this.props.orders.map((order) => (
        <Order
          ingredients={{...order.ingredients}}
          price={order.price}
          key = {order.id}/>
      ))
    }
    if (this.props.loading) {
      orders = <Spinner/>
    }
    return (
      <>
        {orders}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token , userId) => dispatch(actions.fetchOrders(token, userId)),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Orders);


// orders = Object.entries(this.state.orders)
//   .map((order) => (
//     <Order key={order[0]} {...order[1]}/>
//   ))
