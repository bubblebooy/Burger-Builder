import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input'
import './Auth.scss'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/'


class Auth extends Component {
  state = {
    isSignup: true,
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-Mail Address',
        },
        value: 'test@test.com',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '123456',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    }
    this.setState({controls: updatedControls})
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }
    if (rules.minLength) {
      isValid =  isValid && value.length >= rules.minLength
    }
    if (rules.maxLength) {
      isValid =  isValid && value.length <= rules.maxLength
    }

    return isValid;
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => ({isSignup: !prevState.isSignup}))
  }

  render () {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      let config = this.state.controls[key]
      formElementsArray.push(
        <Input
          key={key}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          value={config.value}
          valid={config.valid || !config.touched}
          changed={(e) => this.inputChangedHandler(e,key)}/>
      );
    }

    if (this.props.loading) {
      formElementsArray = <Spinner />
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p className='error'>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.isBuilding ? '/checkout' : '/'} />
    }

    return (
      <div className="Auth">
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          {formElementsArray}
          {errorMessage}
          <button className="Button Success"> {this.state.isSignup ? 'Create Account' : 'Sign-in' } </button>
        </form>
          <button
            className="Button Danger Small"
            onClick={this.switchAuthModeHandler}>
            {this.state.isSignup ? 'Sign-in' : 'Create Account'}
          </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, signup) => dispatch(actions.auth(email, password, signup))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Auth);
