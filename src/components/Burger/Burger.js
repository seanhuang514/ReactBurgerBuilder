import React from 'react';
import BurgerIngredient, { INGREDIENT_LIST } from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const Burger = props => {

  let ingredients = Object.keys(props.ingredients).map(ingredientName => {
    const quantity = props.ingredients[ingredientName];

    /* 
      Array(2) will create empty array and length is 2 but empty array can not map 
      use Array(2).fill() or Array.from(Array(2)) to push values to array
    */
    return Array(quantity).fill().map((_, index) => {
      return <BurgerIngredient key={ingredientName + index} type={ingredientName} />
    })
  }).flat();
  // console.log(ingredients) // [[{...}, {...}], [{...}], [{...}, {...}], [{...}]]

  /* flatten array [{...}, {...}, {...}, {...}] */
  ingredients.reduce((arr, value) => arr.concat(value), [])
  // or use new way ingredients.flat() 

  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>;
  }
  
  return (
    <div className={classes.burger}>
      <BurgerIngredient type={INGREDIENT_LIST.breadTop.name} />
      {ingredients}
      <BurgerIngredient type={INGREDIENT_LIST.breadBottom.name} />
    </div>
  )
}

export default Burger;

