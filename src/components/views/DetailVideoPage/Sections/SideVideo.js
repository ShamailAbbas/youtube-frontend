import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../../../css/SideVideos.css'
function SideVideo({ videoId }) {
  const [SideVideos, setSideVideos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/video/getVideos').then((response) => {
      if (response.data.success) {
        const allvideos = response.data.videos
        const filteredvideos = allvideos.filter(
          (video) => video._id !== videoId
        )

        setSideVideos(filteredvideos)
      } else {
        alert('Failed to get Videos')
      }
    })
  }, [])

  const sideVideoItem = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60)
    var seconds = Math.floor(video.duration - minutes * 60)

    return (
      <a href={`/video/${video._id}`} className='mainwrapper'>
        <div className='image'>
          <img
            src={`http://localhost:5000/${video.thumbnail}`}
            alt='thumbnail'
          />
          <p className='vduration'>
            {minutes} : {seconds}
          </p>
        </div>

        <div className='vinfo'>
          <h4 className='title'>{video.title}</h4>

          <p className='channel'>{video.writer?.name}</p>

          <p className='views'>{video.views} views</p>
        </div>
      </a>
    )
  })

  return <div>{sideVideoItem}</div>
}

export default SideVideo
