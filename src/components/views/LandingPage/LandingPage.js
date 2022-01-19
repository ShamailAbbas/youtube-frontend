import React, { useEffect, useState } from 'react'
import '../../../css/LandingPage.css'
import axios from 'axios'
import moment from 'moment'
import Sidebar from '../Sidebar/Sidebar'
import url from '../../../url'
import Videocard from '../../videocard'

function LandingPage() {
  const [Videos, setVideos] = useState([])
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${url}/video/getVideos`).then((response) => {
        if (response.data.success) {
          console.log(response)
          setVideos(response.data.videos)
          setLoading(false)
        } else {
          alert('Failed to get Videos')
        }
      })
    }
    fetch()
  }, [])
  const loading = () => {
    return (
      <div>
        <h1>Loading......</h1>
      </div>
    )
  }

  const renderCards = Videos.map((video, index) => {
    var hours = Math.floor(video.duration / 3600)
    let secleft=video.duration-hours*3600
    var minutes = Math.floor(secleft / 60)
    secleft=secleft-minutes*60
    var seconds = Math.floor(secleft)
console.log("trimmed... ",video.title.slice(0,20))
    return (
      <Videocard
      video={video} hours={hours} minutes={minutes} seconds={seconds}
      ></Videocard>
    )
  })

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div
        className='sidebar'
        style={{
          borderRight: '1px solid lightgray',
          position: 'fixed',
          left: '0',
          top: '5em',
          bottom: '0',
          width: '18vw',
          zIndex: '100',
          overflow: 'scroll',
          
        }}
      >
        <Sidebar></Sidebar>
      </div>
      <div style={{ width: '82vw' }} className='videocontainer'>
        {Loading ? loading() : renderCards}
      </div>
    </div>
  )
}

export default LandingPage
