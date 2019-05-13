
import React from 'react'
import classes from './order.css';

const Order = props => (
  <div className={classes.order}>
    <p>Ingredients: Salad (1)</p>
    <p>Price: <strong>USD 4.5</strong></p>
  </div>
);

export default Order;