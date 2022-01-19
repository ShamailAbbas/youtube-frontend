import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaHome,
  FaHistory,
  FaSave,
  FaFire,
  FaYoutube,
  FaDatabase,
  FaMusic,
  FaNewspaper,
  FaGamepad,
  FaFootballBall,
} from 'react-icons/fa'


const Sidebar = () => {
  return (
    <div style={{ opacity: '.9' }}>
      <Link to="/" style={{textDecoration:"none"}}>
      <h4 style={{ margin: '2em ' }}>
        <FaHome style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Home
      </h4>
      </Link>
      <h4 style={{ margin: '2em ' }}>
        <FaFire style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Trending
      </h4>
      <hr style={{ opacity: '.4' }} />
      <Link to="/subscriptions" style={{textDecoration:"none"}}
      > <h4 style={{ margin: '2em ' }} >
        <FaYoutube style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Subscribtions
      </h4></Link>
     
      <h4 style={{ margin: '2em ' }}>
        <FaDatabase style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Analytics
      </h4>
      <hr style={{ opacity: '.4' }} />
      <h4 style={{ margin: '2em ' }}>
        <FaSave style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        PLaylist
      </h4>
      <h4 style={{ margin: '2em ' }}>
        <FaHistory style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Saved
      </h4>
      <h4 style={{ margin: '2em ' }}>
        <FaMusic style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Music
      </h4>
      <h4 style={{ margin: '2em ' }}>
        <FaFootballBall style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Sports
      </h4>
      <h4 style={{ margin: '2em ' }}>
        <FaNewspaper style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        News
      </h4>
      <h4 style={{ margin: '2em ' }}>
        <FaGamepad style={{ marginRight: '2em ', fontSize: '1.5em' }} />
        Game
      </h4>
      
    </div>
  )
}

export default Sidebar
