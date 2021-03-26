import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import '../../../../css/Comments.css'
import url from '../../../../url'
function Comments(props) {
  const user = useSelector((state) => state.user)
  const [Comment, setComment] = useState('')

  const history = useHistory()

  const handleChange = (e) => {
    setComment(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (user.userData) {
      const variables = {
        content: Comment,
        writer: user.userData._id,
        postId: props.postId,
      }

      axios.post(`${url}/comment/saveComment`, variables).then((response) => {
        if (response.data.success) {
          setComment('')

          props.refreshFunction(response.data.result)
        } else {
          alert('Failed to save Comment')
        }
      })
    } else {
      history.push('/login')
    }
  }

  return (
    <div>
      {/* Root Comment Form */}
      <p className='commentheading'>Comments</p>

      <form className='commentform' onSubmit={onSubmit}>
        <textArea
          className='textarea'
          onChange={handleChange}
          value={Comment}
          placeholder='Add a comment'
        />
        <br />
        {Comment && (
          <>
            <button className='btn' onClick={() => setComment('')}>
              Cancel
            </button>
            <button className='btn' onClick={onSubmit}>
              Submit
            </button>
          </>
        )}
      </form>

      {/* Comment Lists  */}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}
    </div>
  )
}

export default Comments
