import React from 'react';
import BurgerIngredient, { INGREDIENT_LIST } from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const Burger = porps => {
  return (
    <div className={classes.burger}>
      <BurgerIngredient type={INGREDIENT_LIST.BREAD_TOP} />
      <BurgerIngredient type={INGREDIENT_LIST.CHEESE} />
      <BurgerIngredient type={INGREDIENT_LIST.MEAT} />
      <BurgerIngredient type={INGREDIENT_LIST.BREAD_BOTTOM} />
    </div>
  )
}

export default Burger;

