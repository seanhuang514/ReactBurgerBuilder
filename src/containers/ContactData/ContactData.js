import React, { Component } from 'react';
import Button from '../../components/ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';
import { withRouter } from 'react-router-dom'
import Input from '../../components/ui/Input/Input'
import { connect } from 'react-redux';

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
        valid: false,
        tocuhed: false
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
        valid: false,
        tocuhed: false
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
        valid: false,
        tocuhed: false
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
        valid: false,
        tocuhed: false
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
        valid: false,
        tocuhed: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          option: [
            { value: 'faster', displayValue: 'faster' },
            { value: 'cheapest', displayValue: 'cheapest' }
          ]
        },
        value: 'faster',
        validation: {},
        valid: true,
        tocuhed: false
      },
    },
    loading: false,
    formIsValid: false
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
          <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
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
    cloneElementConfig.touched = true
    cloneOrderFormState[inputIdentify] = cloneElementConfig

    let formValid = true

    for(let identify in cloneOrderFormState){
      // console.log('identify',identify, cloneOrderFormState[identify].valid)
      formValid = cloneOrderFormState[identify].valid
      if(!formValid) break;
    }

    // console.log('valid', formValid)

    this.setState({orderForm: cloneOrderFormState, formIsValid: formValid})
  }

  checkValidity(value, rules) {
    let isValid = false;
    if(Object.keys(rules).length === 0) return true;
  
    if(rules.required) {
      isValid = value.trim() !== ''
    }

    if(rules.minLength) {
      // console.log(rule.minLength)
      isValid = value.length >= rules.minLength && isValid
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}


export default connect(mapStateToProps)(withRouter(ContactData));