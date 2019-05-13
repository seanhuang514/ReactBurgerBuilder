
import React from 'react'
import classes from './order.css';


const Order = props => {
  /* original way
  let ingredients = []
  for(let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }
  console.log('QQ',ingredients)
  const ingredientOutput = ingredients.map(ig => {
    return <span key={ig.name}>{ig.name} ({ig.amount}) </span>
  })
  console.log('ingredientOutput', ingredientOutput) 
  */

  /* easier way */
  let ingredientOutput = []
  for(const [key, value] of Object.entries(props.ingredients)) {
    ingredientOutput.push(<span className={classes.label} key={key}>{key}:({value})</span>)
  }

  return(
    <div className={classes.order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  );
}

export default Order;