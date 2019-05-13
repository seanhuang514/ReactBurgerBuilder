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
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipCode'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          option: [
            { value: 'faster', displayValue: 'faster' },
            { value: 'cheapest', displayValue: 'cheapest' }
          ]
        },
        value: 'faster'
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    this.setState({ loading: true });

    const formData = {};

    for(let inputIdentity in this.state.orderForm) {
      formData[inputIdentity] = this.state.orderForm[inputIdentity].value
    }

    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData
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

    let inputElementOutput = []
    for(const [key, value] of Object.entries(this.state.orderForm)) {
      inputElementOutput.push(<Input key={key} changed={(event) => this.inputChangedHandler(event, key)} {...value} />)
    }

    return(
      <form onSubmit={this.orderHandler}>
          {inputElementOutput}
          <Button btnType="Success">ORDER</Button>
        </form>
    )
  }

  inputChangedHandler(event, inputIdentify) {
    // console.log('inputChangedHandler', event.target.value)
    // console.log('inputChangedHandler', inputIdentify)

    /* 只會 clone orderForm 不會 clone nested object */
    const cloneOrderFormState = {...this.state.orderForm};
    /* 必須要在 clone 內層的 object */
    const cloneElementConfig = {...cloneOrderFormState[inputIdentify]}
    cloneElementConfig.value = event.target.value;
    cloneOrderFormState[inputIdentify] = cloneElementConfig
    this.setState({orderForm: cloneOrderFormState})
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