import React from "react";
import classes from './BuilderControl.css'

const BuilderControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less}
              onClick={() => props.ingredientRemoved(props.label)}
              disabled={props.disabled}>
        Less
      </button>
      <button className={classes.More} onClick={() => props.ingredientAdded(props.label)}>More</button>
    </div>
  )
};

export default BuilderControl;
