import * as actionTypes from './actionTypes';

const authStart = () => ({type: actionTypes.AUTH_START})
const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId,
  }
}

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => ({type: actionTypes.AUTH_LOGOUT,})

const checkAuthTimeout = (expierationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expierationTime*1000)
  };
}

export const auth = (email, password, signup = true) => {
  return dispatch => {
    dispatch(authStart());
    let url = ( signup ?
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAUVb0O7j_l7QJu1buHd5WmClJRfI98H4Q'  :
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAUVb0O7j_l7QJu1buHd5WmClJRfI98H4Q' )

    fetch( url ,{
      // mode: 'no-cors',
      method: "POST",
      headers: {
            "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true}),
    })
    .then( response => response.json())
    .then( response => {
      if (response.error) throw response.error;
      console.log(response)
      let user = {
        token: response.idToken,
        userId: response.localId,
        expirationDate: new Date(new Date().getTime() + response.expiresIn * 1000),
      }
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(authSuccess(response))
      dispatch(checkAuthTimeout(response.expiresIn))
    })
    .catch(error => {
      console.error(error);
      dispatch(authFail(error))
    })
    //https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[API_KEY]
  };
}

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      dispatch(logout())
    } else {
      const token = user.token
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess({idToken: token,localId: user.userId}))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}
