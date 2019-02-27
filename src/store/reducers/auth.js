import * as actionTypes from '../actions/actionTypes'

const initialState = {
  token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null,
  userId: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userId : null,
  error: null,
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false,
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case actionTypes.AUTH_LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducer;
