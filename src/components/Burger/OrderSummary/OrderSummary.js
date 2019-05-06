import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../ui/Button/Button'

const OrderSummary = props => {
  const summaries = Object.keys(props.ingredients).map(key => {
    return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}</li>
  });

  return (
    <Aux>
      <h3>Your Orders</h3>
      <p>Burger with flowing ingredients</p>
      <ul>
        {summaries}
      </ul>
      <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
      <Button btnType='Danger' clicked={props.cancelPurchase}>CANCEL</Button>
      <Button btnType='Success' clicked={props.continuePurchase}>CONTINUE</Button>
    </Aux>
  )
}

export default OrderSummary