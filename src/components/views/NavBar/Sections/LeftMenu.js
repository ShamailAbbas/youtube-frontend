import React from 'react'
// import { div } from 'antd';

function LeftMenu(props) {
  return (
    <div style={{ display: 'flex', marginTop: '1em' }}>
      <a
        href='/'
        style={{
          textDecoration: 'none',
          marginRight: '.5em',
          fontWeight: 'bold',
          fontSize: '1.1em',
          color: '#3f3f3f',
        }}
      >
        Home
      </a>

      <a
        href='/subscriptions'
        style={{
          textDecoration: 'none',
          marginRight: '.5em',
          fontWeight: 'bold',
          fontSize: '1.1em',
          color: '#3f3f3f',
        }}
      >
        Subscriptions
      </a>
    </div>
  )
}

export default LeftMenu
