import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../../_actions/user_actions'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

function LoginPage(props) {
  const dispatch = useDispatch()

  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          }

          dispatch(loginUser(dataToSubmit))
            .then(async (response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem(
                  'user',
                  JSON.stringify(response.payload.user)
                )

                props.history.push('/')
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch((err) => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage('')
              }, 3000)
            })
          setSubmitting(false)
        }, 500)
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props
        return (
          <div className='app'>
            <form
              onSubmit={handleSubmit}
              style={{
                width: '300px',
                // border: '1px solid gold',
                backgroundColor: 'lightgray',
                padding: '1em',
                marginTop: '-300px',
              }}
            >
              <input
                style={{ padding: '1em', margin: '1em', width: '250px' }}
                id='email'
                placeholder='Enter your email'
                type='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              {errors.email && touched.email && (
                <div className='input-feedback'>{errors.email}</div>
              )}
              <input
                style={{ padding: '1em', margin: '1em', width: '250px' }}
                id='password'
                placeholder='Enter your password'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              {errors.password && touched.password && (
                <div className='input-feedback'>{errors.password}</div>
              )}
              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: '#ff0000bf',
                      fontSize: '0.7rem',
                      border: '1px solid',
                      padding: '1rem',
                      borderRadius: '10px',
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}
              <a
                className='login-form-forgot'
                href='/reset_user'
                style={{ float: 'right', marginRight: '.5em' }}
              >
                forgot password
              </a>
              <div>
                <button
                  type='primary'
                  htmltype='submit'
                  className='login-form-button'
                  style={{ padding: '1em', margin: '1em', width: '250px' }}
                  disabled={isSubmitting}
                  onSubmit={handleSubmit}
                >
                  Log in
                </button>
              </div>
              <a style={{ margin: '1em' }} href='/register'>
                register now!
              </a>
            </form>
          </div>
        )
      }}
    </Formik>
  )
}

export default withRouter(LoginPage)
