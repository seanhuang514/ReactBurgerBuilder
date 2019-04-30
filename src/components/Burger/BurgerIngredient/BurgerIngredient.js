import React from "react";
import classes from "./BurgerIngredient.css";
import PropType from 'prop-types'

export const INGREDIENT_LIST = {
  BREAD_BOTTOM: 'bread-bottom',
  BREAD_TOP: 'bread-top',
  MEAT: 'meat',
  CHEESE: 'cheese',
  SALAD: 'salad',
  BACON: 'bacon',
}

const BurgerIngredient = props => {
  let ingredient = null;
  
  switch (props.type) {
    case INGREDIENT_LIST.BREAD_BOTTOM:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case INGREDIENT_LIST.BREAD_TOP:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case INGREDIENT_LIST.MEAT:
      ingredient = <div className={classes.Meat}></div>
      break;
    case INGREDIENT_LIST.CHEESE:
    ingredient = <div className={classes.Cheese}></div>
      break;
    case INGREDIENT_LIST.SALAD:
      ingredient = <div className={classes.Salad}></div>
      break;
    case INGREDIENT_LIST.BACON:
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
