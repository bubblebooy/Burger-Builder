import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import './Auth.scss'

class Auth extends Component {
  state = {
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

  render () {
    const formElementsArray = [];
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
    console.log(formElementsArray);
    return (
      <div className="Auth">
        <form>
          {formElementsArray}
          <button className="Button Success"> SUBMIT </button>
        </form>
      </div>
    );
  }
}

export default Auth;
