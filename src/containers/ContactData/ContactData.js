import React, { Component } from 'react';
import Button from '../../components/ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';
import { withRouter } from 'react-router-dom'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'sean huang',
        address: {
          street: 'test street 1',
          country: 'Taiwan',
          zipCode: '12345'
        },
        email: 'sean.huang@email.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  get form() {
    if(this.state.loading) return <Spinner/>

    return(
      <form>
          <input type="text" name="name" placeholder="Your name"/>
          <input type="text" name="email" placeholder="Your email"/>
          <input type="text" name="street" placeholder="Your street"/>
          <input type="text" name="postal" placeholder="Your postal code"/>
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
    )
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {this.form}
      </div>
    )
  }
}

export default withRouter(ContactData);