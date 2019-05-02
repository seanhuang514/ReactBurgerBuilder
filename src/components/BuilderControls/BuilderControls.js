import React from 'react'
import { INGREDIENT_LIST } from '../Burger/BurgerIngredient/BurgerIngredient';
import BuilderControl from './BuilderControl/BuilderControl';
import classes from './BuilderControls.css';

const BuilderControls = props => {
  const controls = [
    { label: INGREDIENT_LIST.BACON, type: INGREDIENT_LIST.BACON },
    { label: INGREDIENT_LIST.CHEESE, type: INGREDIENT_LIST.CHEESE },
    { label: INGREDIENT_LIST.SALAD, type: INGREDIENT_LIST.SALAD },
    { label: INGREDIENT_LIST.MEAT, type: INGREDIENT_LIST.MEAT },
  ]
  return (
    <div className={classes.BuilderControls}>
      {
        controls.map(control => {
          return <BuilderControl key={control.label} label={control.label} />
        })
      }
    </div>
  )
}

export default BuilderControls