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
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zipCode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
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
      inputElementOutput.push(<Input key={key}
                                     changed={(event) => this.inputChangedHandler(event, key)}
                                     invalid={!value.valid}
                                     shouldValid={value.validation}
                                     {...value}  />)
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
    cloneElementConfig.valid = this.checkValidity(cloneElementConfig.value, cloneElementConfig.validation)
    // console.log('valid', cloneElementConfig.valid)
    cloneOrderFormState[inputIdentify] = cloneElementConfig
    this.setState({orderForm: cloneOrderFormState})
  }

  checkValidity(value, rule) {
    let isValid = false;

    if(rule.required) {
      isValid = value.trim() !== ''
    }

    if(rule.minLength) {
      // console.log(rule.minLength)
      isValid = value.length >= rule.minLength && isValid
    }

    if(rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid
    }

    return isValid;
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