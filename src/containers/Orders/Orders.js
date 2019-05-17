import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WIthErrorHandler from '../../hoc/WIthErrorHandler/WithErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/ui/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  get orders() {
    if(!this.props.orders) return null

    return this.props.orders.map(order => {
      return <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice}/>
    })
  }

  render() {
    if(this.props.loading) return <Spinner/>

    return (
      <div>
        {this.orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WIthErrorHandler(Orders, axios));