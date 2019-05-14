import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../ui/Button/Button'

class OrderSummary extends Component {

  componentWillUpdate() {
    // console.log('[OrderSummary]-componentWillUpdate');
  }

  render () {
    const summaries = Object.keys(this.props.ingredients).map(key => {
      return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}</li>
    });

    return (
      <Aux>
        <h3>Your Orders</h3>
        <p>Burger with flowing ingredients</p>
        <ul>
          {summaries}
        </ul>
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <Button btnType='Danger' clicked={this.props.cancelPurchase}>CANCEL</Button>
        <Button btnType='Success' clicked={this.props.continuePurchase}>CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummary