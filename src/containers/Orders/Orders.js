import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WIthErrorHandler from '../../hoc/WIthErrorHandler/WithErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        // console.log('orders response', res);
        const fetchOrders = []
        for(let key in res.data) {
          fetchOrders.push({
            id: key,
            ...res.data[key]
          })
        }

        this.setState({ orders: fetchOrders, loading: false }, () => {
          // console.log(this.state)
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <div>
        <Order/>
        <Order/>
      </div>
    )
  }
}

export default WIthErrorHandler(Orders, axios);