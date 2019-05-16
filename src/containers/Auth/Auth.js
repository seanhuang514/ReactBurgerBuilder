import React, { Component } from 'react';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    }
  }

  get form() {
    // if(this.props.loading) return <Spinner/>

    let inputElementOutput = []
    for(const [key, value] of Object.entries(this.state.controls)) {
      inputElementOutput.push(<Input key={key}
                                     changed={(event) => this.inputChangeHandler(event, key)}
                                     invalid={!value.valid}
                                     shouldValid={value.validation}
                                     {...value}  />)
    }

    return(
      <form onSubmit={this.orderHandler}>
          {inputElementOutput}
          <Button btnType="Success">SUBMIT</Button>
        </form>
    )
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({ controls: updatedControls })
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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
  }

    return isValid;
  }

  render() {
    return (
      <div className={classes.auth}>
        {this.form}
      </div>
    )
  }
}

export default Auth;
