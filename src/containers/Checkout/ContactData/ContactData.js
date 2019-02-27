import React, {Component} from 'react';
import { connect } from 'react-redux'

import './ContactData.scss'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your@Email.com',
        },
        value: '',
        validation: {
          required: false
        },
        valid: true,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Adress Street',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Zip Code',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest' , displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {
        },
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
  }

  orderHandler =(event) => {
    event.preventDefault()
    // this.setState( {loading: true })
    const formData = {};
    for (let formKey in this.state.orderForm) {
      formData[formKey] = this.state.orderForm[formKey].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData,
      userId: this.props.userId,
    }
    this.props.onOrderBurger(order,this.props.token)
    // fetch('https://react-my-burger-7c16f.firebaseio.com/order.json',{
    //   method: "POST",
    //   // mode: 'cors',
    //   // credentials: "same-origin",
    //   headers: {
    //         "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(order),
    // })
    // .then( response => response.json())
    // .then( response => {
    //   this.setState({loading: false})
    //   this.props.history.push('/');
    // })
    // .catch(error => {
    //   this.setState({loading: false})
    //   console.log("error",error)
    // })
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

  inputChangedHandler = (event, inputID) => {
    const updatedForm = {
      ...this.state.orderForm
    };
    const updatedElement = {
      ...updatedForm[inputID]
    };
    updatedElement.value = event.target.value;
    updatedElement.valid = this.checkValidity(updatedElement.value , updatedElement.validation)
    updatedElement.touched = true;
    updatedForm[inputID] = updatedElement

    let formIsValid = true;
    for(let inputKey in updatedForm) {
      formIsValid = formIsValid && updatedForm[inputKey].valid
    }
    this.setState({orderForm: updatedForm, formIsValid: formIsValid})
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      let config = this.state.orderForm[key]
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
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray}
        <button className='Button Success' disabled={!this.state.formIsValid}> ORDER </button>
      </form>
    )
    if ( this.props.loading ) {
      form = <Spinner />;
    }
    return (
      <div className='ContactData'>
        <h4> Enter your Contact Data</h4>
          {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData)
