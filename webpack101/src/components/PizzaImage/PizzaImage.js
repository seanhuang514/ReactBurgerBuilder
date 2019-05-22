import classes from './PizzaImage.css';
import image from '../../assets/images/pizza.jpg';

import React from 'react'
const PizzaImage = props => (
  <div className={classes.PizzaImage}>
    <img className={classes.pizzaImg} src={image} alt=""/>
  </div>
)

export default PizzaImage;