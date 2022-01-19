import React, { useState } from "react";
import "../../../../css/SingleComment.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import LikeDislikes from "./LikeDislikes";
import { useHistory } from "react-router-dom";
import url from "../../../../url";
function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.userData) {
      const variables = {
        writer: user.userData._id,
        postId: props.postId,
        responseTo: props.comment._id,
        content: CommentValue,
      };

      Axios.post(`${url}/comment/saveComment`, variables).then((response) => {
        if (response.data.success) {
          setCommentValue("");
          setOpenReply(!OpenReply);
          props.refreshFunction(response.data.result);
        } else {
          alert("Failed to save Comment");
        }
      });
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="outerbox">
      <div className="secondbox">
        <img src={props.comment.writer.image} alt="" />

        <div className="thirdbox">
          <h4>{props.comment.writer.name}</h4>
          <p className="comcontent">{props.comment.content}</p>
          <div className="fourthbox">
            <LikeDislikes
              comment
              commentId={props.comment._id}
              userId={localStorage.getItem("userId")}
            />
            {!OpenReply && (
              <p className="reply" onClick={openReply}>
                Reply
              </p>
            )}
          </div>
        </div>
      </div>

      {OpenReply && (
        <form className="cmntform" onSubmit={onSubmit}>
          <textArea
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
          <br />
          <button onClick={() => setOpenReply(false)}>Cancel</button>
          <button onClick={onSubmit}>Submit</button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
