import React from "react";
import classes from "./BurgerIngredient.css";
import PropType from 'prop-types'

export const INGREDIENT_LIST = {
  breadBottom: { name: 'bread-bottom', price: 0 },
  breadTop: { name: 'bread-top', price: 0 },
  meat: { name: 'meat', price: 2 },
  cheese: { name: 'cheese', price: 1 },
  salad: { name: 'salad', price: 0.5 },
  bacon: { name: 'bacon', price: 1.5 },
}

const BurgerIngredient = props => {
  let ingredient = null;
  
  switch (props.type) {
    case INGREDIENT_LIST.breadBottom.name:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case INGREDIENT_LIST.breadTop.name:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case INGREDIENT_LIST.meat.name:
      ingredient = <div className={classes.Meat}></div>
      break;
    case INGREDIENT_LIST.cheese.name:
    ingredient = <div className={classes.Cheese}></div>
      break;
    case INGREDIENT_LIST.salad.name:
      ingredient = <div className={classes.Salad}></div>
      break;
    case INGREDIENT_LIST.bacon.name:
      ingredient = <div className={classes.Bacon}></div>
      break;
    default: 
      ingredient = null;
  }

  return ingredient
};

BurgerIngredient.PropType = {
  type: PropType.string.isRequired
}

export default BurgerIngredient;
