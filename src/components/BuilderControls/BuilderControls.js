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
      {
        controls.map(control => {
          return <BuilderControl
                    key={control.label}
                    label={control.label}
                    ingredientAdded={props.ingredientAdded} />
        })
      }
    </div>
  )
}

export default BuilderControls