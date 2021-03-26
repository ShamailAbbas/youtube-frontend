import React, { useEffect } from 'react'
import { auth } from '../_actions/user_actions'
import { useDispatch } from 'react-redux'

const Auth = (ComposedClass, reload, adminRoute = null) => {
  function AuthenticationCheck(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(auth(user))
    }, [dispatch])

    return <ComposedClass {...props} user={user} />
  }
  return AuthenticationCheck
}
export default Auth
