import React from "react";
import moment from "moment";
import url from "../url";
const Videocard = ({ video, hours, minutes, seconds }) => {
  return (
    <>
      <div className="videobox">
        <div className="thumbnailcontainer">
          <a href={`/video/${video._id}`}>
            <img
              className="thumbnail"
              alt="thumbnail"
              src={`${video.thumbnail}`}
            />
            <p className=" duration">
              {hours ? `${hours}:` : ""}
              {minutes ? `${minutes}:` : "0:"}
              {seconds}
              {/* {video.duration} */}
            </p>
          </a>
        </div>
        <div className="imgplustitle">
          <img src={video.writer.image} alt="" />
          <h4 style={{ marginLeft: "5px" }}>
            {video.title.slice(0, 30)} {video.title.length > 25 ? "..." : ""}
          </h4>
        </div>
        <div style={{ marginLeft: "5px" }}>{video.writer?.name}</div>
        <div style={{ display: "flex", marginLeft: "5px" }}>
          <p style={{ marginRight: "10px" }}>
            {video.views} {video.views > 0 ? "views" : "view"}
          </p>
          <p> {moment(video.createdAt).format("MMM Do YY")} </p>
        </div>
      </div>
    </>
  );
};

export default Videocard;
