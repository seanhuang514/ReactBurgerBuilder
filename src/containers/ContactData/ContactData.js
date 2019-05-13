import React, { Component } from 'react';
import Button from '../../components/ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';
import { withRouter } from 'react-router-dom'
import Input from '../../components/ui/Input/Input'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: 'sean'
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: 'test street'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: 'Taiwan'
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipCode'
        },
        value: '12345'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: 'sean@email.com'
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          option: [
            { value: 'faster', displayValue: 'faster' },
            { value: 'cheapest', displayValue: 'cheapest' }
          ]
        },
        value: 'sean@email.com'
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice
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
          <Input elementType={this.state.orderForm.name.elementType}
                 elementConfig={this.state.orderForm.name.elementConfig}
                 value={this.state.orderForm.name.value}/>
          
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