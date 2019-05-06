import React from 'react';
import Aux from '../../../hoc/Aux'

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
    </Aux>
  )
}

export default OrderSummary