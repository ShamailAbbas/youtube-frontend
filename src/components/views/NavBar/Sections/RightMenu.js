import React from 'react'
import { withRouter } from 'react-router-dom'
import { FaUpload } from 'react-icons/fa'
import { useSelector } from 'react-redux'


function RightMenu(props) {
  const user = useSelector((state) => state.user.loginSuccess)
  const username = useSelector((state) => state.user.userData?.name)

  if (user === true) {
    return (
      <div>
        <div style={{ display: 'flex', margin: '1em', flexDirection: 'row' }}>
          <p style={{ margin: '.5em .5em', fontSize:"15px" }}>
            Hello <strong>{username}</strong>
          </p>
          <div style={{ margin: '.3em .5em' }}>
            <a href='/video/upload'>
              <FaUpload style={{ fontSize: '1.5em', color: 'gray' }} />
            </a>
          </div>
          <div style={{ margin: '0em .5em' }}>
            <button
              style={{
                padding: '.5em 1em',
                border: '1px solid blue',
                color: 'blue',
              }}
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div style={{ display: 'flex', margin: '1em' }}>
          <a
            style={{
              textDecoration: 'none',
              marginRight: '.5em',
              fontWeight: 'bold',
              fontSize: '1.3em',
            }}
            href='/login'
          >
            <button
              style={{
                padding: '.5em 1em',
                border: '1px solid blue',
                color: 'blue',
              }}
            >
              Signin
            </button>
          </a>
        </div>
      </>
    )
  }
}

export default withRouter(RightMenu)
