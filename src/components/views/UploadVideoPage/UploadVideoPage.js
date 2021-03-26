import React, { useState } from 'react'

import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useSelector } from 'react-redux'
import url from '../../../url'
const Private = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
]

const Catogory = [
  { value: 0, label: 'Film & Animation' },
  { value: 0, label: 'Autos & Vehicles' },
  { value: 0, label: 'Music' },
  { value: 0, label: 'Pets & Animals' },
  { value: 0, label: 'Sports' },
]

function UploadVideoPage(props) {
  const user = useSelector((state) => state.user)

  const [title, setTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [privacy, setPrivacy] = useState(0)
  const [Categories, setCategories] = useState('Film & Animation')
  const [FilePath, setFilePath] = useState('')
  const [Duration, setDuration] = useState('')
  const [Thumbnail, setThumbnail] = useState('')

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value)
  }

  const handleChangeDecsription = (event) => {
    console.log(event.currentTarget.value)

    setDescription(event.currentTarget.value)
  }

  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value)
  }

  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (
      title === '' ||
      Description === '' ||
      Categories === '' ||
      FilePath === '' ||
      Duration === '' ||
      Thumbnail === ''
    ) {
      return alert('Please first fill all the fields')
    }

    const variables = {
      writer: user.userData._id,
      title: title,
      description: Description,
      privacy: privacy,
      filePath: FilePath,
      category: Categories,
      duration: Duration,
      thumbnail: Thumbnail,
    }

    axios.post(`${url}/video/uploadVideo`, variables).then((response) => {
      if (response.data.success) {
        alert('video Uploaded Successfully')
        props.history.push('/')
      } else {
        alert('Failed to upload video')
      }
    })
  }

  const onDrop = (files) => {
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    }
    console.log(files)
    formData.append('file', files[0])

    axios
      .post(`${url}/video/uploadfiles/`, formData, config)
      .then((response) => {
        console.log(response)
        if (response.data.success) {
          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          }
          setFilePath(response.data.filePath)

          //gerenate thumbnail with this filepath !

          axios.post(`${url}/video/thumbnail/`, variable).then((response) => {
            if (response.data.success) {
              setDuration(response.data.fileDuration)
              setThumbnail(response.data.thumbsFilePath)
            } else {
              alert('Failed to make the thumbnails')
            }
          })
        } else {
          alert('failed to save the video in server')
        }
      })
  }

  return (
    <div
      style={{
        maxWidth: '350px',
        margin: '2rem auto',
        padding: '1em',
        border: '2px solid lightgray',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}></div>

      <form onSubmit={onSubmit}>
        <div>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '100px',
                  border: '1px solid gray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1em',
                }}
                {...getRootProps()}
              >
                Drag and drop a video here or click to choose one
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>

          {Thumbnail !== '' && (
            <div>
              Video Selected
              {/* <img src={`http://localhost:5000/${Thumbnail}`} alt='haha' /> */}
            </div>
          )}
        </div>

        <br />
        <br />

        <input
          style={{
            padding: '.5em 1em',
            margin: '0',
            width: '300px',
          }}
          onChange={handleChangeTitle}
          value={title}
          placeholder='Title'
        />
        <br />
        <br />

        <textarea
          style={{ padding: '.5em 1em', margin: '0', width: '300px' }}
          onChange={handleChangeDecsription}
          value={Description}
          placeholder='Description'
        />
        <br />
        <br />

        <select
          style={{ padding: '.5em 1em', margin: '0', width: '300px' }}
          onChange={handleChangeOne}
        >
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select
          style={{ padding: '.5em 1em', margin: '0', width: '300px' }}
          onChange={handleChangeTwo}
        >
          {Catogory.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <button
          style={{
            padding: '.5em 1em',
            margin: '0',
            width: '300px',
            border: 'transparent',
            borderRadius: '20px',
            backgroundColor: '#3f3f3f',
            color: 'white',
          }}
          onClick={onSubmit}
        >
          Upload
        </button>
      </form>
    </div>
  )
}

export default UploadVideoPage
