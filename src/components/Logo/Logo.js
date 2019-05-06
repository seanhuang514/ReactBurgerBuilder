import React from 'react';
import LogoImage from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const Logo = props => (
  <div className={classes.logo}>
    {/* 
      DO not write src like below
      <img src="../../assets/images/burger-logo.png"/>
      It won't work on production
    */}
    <img src={LogoImage} alt="Logo"/>
  </div>
);

export default Logo;
