import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from '../_actions/types'
const initialState = {
  register: '',
  loginSuccess: false,
  userData: '',
}
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload }
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload.loginSuccess }
    case AUTH_USER: {
      {
        if (action.payload?.email)
          return {
            ...state,
            loginSuccess: true,
            userData: action.payload,
          }
        else
          return {
            ...state,
            userData: action.payload,
          }
      }
    }

    case LOGOUT_USER:
      return { ...state }
    default:
      return state
  }
}
