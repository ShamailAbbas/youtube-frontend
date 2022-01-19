import React, { useEffect, useState } from "react";
import "../../.../../../../css/Likedislike.css";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import url from "../../../../url";
function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  const history = useHistory();
  let variable = {};
  console.log(props);
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post(`${url}/like/getLikes`, variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setLikes(response.data.likes.length);

        //if I already click this like button or not
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("Failed to get likes");
      }
    });

    Axios.post(`${url}/like/getDislikes`, variable).then((response) => {
      if (response.data.success) {
        //How many likes does this video or comment have
        setDislikes(response.data.dislikes.length);

        //if I already click this like button or not
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("Failed to get dislikes");
      }
    });
  }, []);

  const onLike = () => {
    if (props.userId) {
      if (LikeAction === null) {
        Axios.post(`${url}/like/upLike`, variable).then((response) => {
          if (response.data.success) {
            setLikes(Likes + 1);
            setLikeAction("liked");

            //If dislike button is already clicked

            if (DislikeAction !== null) {
              setDislikeAction(null);
              setDislikes(Dislikes - 1);
            }
          } else {
            alert("Failed to increase the like");
          }
        });
      } else {
        Axios.post(`${url}/like/unLike`, variable).then((response) => {
          if (response.data.success) {
            setLikes(Likes - 1);
            setLikeAction(null);
          } else {
            alert("Failed to decrease the like");
          }
        });
      }
    } else {
      history.push("/login");
    }
  };

  const onDisLike = () => {
    if (props.userId) {
      if (DislikeAction !== null) {
        Axios.post(`${url}/like/unDisLike`, variable).then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes - 1);
            setDislikeAction(null);
          } else {
            alert("Failed to decrease dislike");
          }
        });
      } else {
        Axios.post(`${url}/like/upDisLike`, variable).then((response) => {
          if (response.data.success) {
            setDislikes(Dislikes + 1);
            setDislikeAction("disliked");

            //If dislike button is already clicked
            if (LikeAction !== null) {
              setLikeAction(null);
              setLikes(Likes - 1);
            }
          } else {
            alert("Failed to increase dislike");
          }
        });
      }
    } else {
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <span>
        <span className="likedislike" onClick={onLike}>
          <FaRegThumbsUp></FaRegThumbsUp> {Likes}
        </span>
      </span>
      &nbsp;&nbsp;
      <span>
        <span className="likedislike" onClick={onDisLike}>
          <FaRegThumbsDown></FaRegThumbsDown> {Dislikes}
        </span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislikes;
