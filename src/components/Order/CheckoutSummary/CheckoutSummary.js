import React from 'react';
import classes from './CheckoutSummary.css'
import Burger from '../../Burger/Burger';
import Button from '../../ui/Button/Button'

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes will</h1>
      <div className="burger">
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked>Cancel</Button>
      <Button btnType="Success" clicked>Continue</Button>
    </div>
  )
}

export default CheckoutSummary;