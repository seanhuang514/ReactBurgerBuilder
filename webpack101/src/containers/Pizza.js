import React, { Component } from 'react'
import PizzaImage from '../components/PizzaImage//PizzaImage.js'

class Pizza extends Component {
  render () {
    return (
      <div>
        <h1>Pizze</h1>
        <PizzaImage/>
      </div>
    )
  }
}

export default Pizza