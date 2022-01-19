import React, { useEffect, useState } from "react";
import "../../../css/DetailedVideoPage.css";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";
import { useSelector } from "react-redux";
import url from "../../../url";
function DetailVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [showfulldesc, setshowfulldesc] = useState(false);
  const [desclength, setdesclength] = useState("");
  const [slicedesc, setslicedesc] = useState("");
  const [CommentLists, setCommentLists] = useState([]);
  const user = useSelector((state) => state.user.userData?._id);
  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post(`${url}/video/getVideo`, videoVariable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.video);
        setdesclength(response.data.video.description?.length);
        setslicedesc(response.data.video.description.slice(0, 30));
        console.log("res is.... ", response.data.video);
      } else {
        alert("Failed to get video Info");
      }
    });

    axios.post(`${url}/comment/getComments`, videoVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to get video Info");
      }
    });

    axios.post(`${url}/video/addview`, videoVariable);
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };
  console.log("video length is ", Video?.description?.slice(0, 30));
  if (Video) {
    return (
      <div className="maincontainer">
        <div className="currentvideo">
          <video src={Video?.filePath} controls></video>
          <h1 className="title">{Video.title}</h1>
          <div className="viewpluslike">
            <p>{Video.views} views</p>
            <div>
              <LikeDislikes video videoId={videoId} userId={user} />
            </div>
          </div>

          <div className="belowvideo">
            <div className="info">
              <img src={Video.writer?.image} alt="" />
              <h3>{Video.writer?.name}</h3>
            </div>

            <div className="left">
              <Subscriber userTo={Video.writer?._id} userFrom={user} />
            </div>
          </div>
          {!showfulldesc ? (
            <>
              <p className="description">{slicedesc}</p>
              <p onClick={setshowfulldesc(true)}>
                {desclength > 25 ? "read more..." : ""}
              </p>
            </>
          ) : (
            <p className="description">{Video.description}</p>
          )}
          <div className="commentssectionforpc">
            <Comments
              CommentLists={CommentLists}
              postId={Video._id}
              refreshFunction={updateComment}
            />
          </div>
        </div>
        <div className="sidevideos">
          <SideVideo videoId={videoId} />
          <div className="commentssectionformobile">
            <Comments
              CommentLists={CommentLists}
              postId={Video._id}
              refreshFunction={updateComment}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DetailVideoPage;
