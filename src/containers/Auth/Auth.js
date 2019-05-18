import React, { Component } from 'react';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import Spinner from '../../components/ui/Spinner/Spinner';
import { Redirect } from 'react-router';
import { checkValidity } from '../../utilities/utility.js';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: 'sean@email.com',
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
        value: '123456',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
    },
    isSignUp: true
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
      <form onSubmit={this.submitHandler}>
        {inputElementOutput}
        <Button btnType="Success">SUBMIT</Button>
      </form>
    )
  }

  errorMessage = () => {
    if(this.props.error) {
      return(<p>{this.props.error.message}</p>)
    }

    return null;
  }

  get authRedirect(){

    // if(this.props.isAuthenticate && this.props.hasBurger) return <Redirect to="/checkout"/>

    if(this.props.isAuthenticate) {
      if(this.props.hasBurger){
        return <Redirect to="/checkout"/>
      }else {
        return <Redirect to="/"/>
      }
    }else {
      return null
    }
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    this.setState({ controls: updatedControls })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  isBuildingBurger = () => {
    
  }

  render() {
    return (
      <div className={classes.auth}>
        {this.authRedirect}
        {this.errorMessage()}
        {this.props.loading ? <Spinner/> : this.form}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO { this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP' }
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    ingredients: state.burgerBuilder.ingredients,
    isAuthenticate: state.auth.token !== null,
    hasBurger: state.burgerBuilder.hasBurger,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
