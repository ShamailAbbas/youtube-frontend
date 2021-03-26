import React, { useEffect, useState } from 'react'
import '../../../css/LandingPage.css'
import axios from 'axios'
import moment from 'moment'
import Sidebar from '../Sidebar/Sidebar'
import url from '../../../url'
function LandingPage() {
  const [Videos, setVideos] = useState([])
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    const fetch = async () => {
      await axios.get(`${url}/video/getVideos`).then((response) => {
        if (response.data.success) {
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
    var minutes = Math.floor(video.duration / 60)
    var seconds = Math.floor(video.duration - minutes * 60)

    return (
      <>
        <div className='videobox'>
          <div className='thumbnailcontainer'>
            <a href={`/video/${video._id}`}>
              <img
                className='thumbnail'
                alt='thumbnail'
                src={`${url}/${video.thumbnail}`}
              />
              <p className=' duration'>
                {minutes} : {seconds}
              </p>
            </a>
          </div>
          <div className='imgplustitle'>
            <img src={video.writer.image} alt='' />
            <h4>{video.title}</h4>
            <div>
              <h1 style={{ lineHeight: '6px', opacity: '.6' }}>.</h1>
              <h1 style={{ lineHeight: '6px', opacity: '.6' }}>.</h1>
              <h1 style={{ lineHeight: '6px', opacity: '.6' }}>.</h1>
            </div>
          </div>
          <div style={{ marginLeft: '60px' }}>{video.writer?.name}</div>
          <div style={{ display: 'flex', marginLeft: '60px' }}>
            <p style={{ marginRight: '10px' }}>Views {video.views}</p>
            <p> {moment(video.createdAt).format('MMM Do YY')} </p>
          </div>
        </div>
      </>
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
