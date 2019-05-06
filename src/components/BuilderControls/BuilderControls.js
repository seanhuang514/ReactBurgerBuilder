import React from 'react'
import { INGREDIENT_LIST } from '../Burger/BurgerIngredient/BurgerIngredient';
import BuilderControl from './BuilderControl/BuilderControl';
import classes from './BuilderControls.css';

const BuilderControls = props => {
  const controls = [
    { label: INGREDIENT_LIST.bacon.name },
    { label: INGREDIENT_LIST.cheese.name },
    { label: INGREDIENT_LIST.salad.name },
    { label: INGREDIENT_LIST.meat.name },
  ]
  return (
    <div className={classes.BuilderControls}>
      <p><strong>Current Price: {props.totalPrice.toFixed(2)}</strong></p>
      {
        controls.map(control => {
          return <BuilderControl
                    key={control.label}
                    label={control.label}
                    ingredientAdded={props.ingredientAdded}
                    ingredientRemoved={props.ingredientRemoved}
                    disabled={props.disabledInfo[control.label]} />
        })
      }
      <button className={classes.OrderButton}
              disabled={!props.purchaseable}
              onClick={props.ordered}>
        Order
      </button>
    </div>
  )
}

export default BuilderControls