import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../css/SideVideos.css";
import url from "../../../../url";
function SideVideo({ videoId }) {
  const [SideVideos, setSideVideos] = useState([]);

  useEffect(() => {
    axios.get(`${url}/video/getVideos`).then((response) => {
      if (response.data.success) {
        const allvideos = response.data.videos;
        const filteredvideos = allvideos.filter(
          (video) => video._id !== videoId
        );

        setSideVideos(filteredvideos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const sideVideoItem = SideVideos.map((video, index) => {
    var hours = Math.floor(video.duration / 3600);
    let secleft = video.duration - hours * 3600;
    var minutes = Math.floor(secleft / 60);
    secleft = secleft - minutes * 60;
    var seconds = Math.floor(secleft);

    return (
      <a href={`/video/${video._id}`} className="mainwrapper">
        <div className="image">
          <img src={video.thumbnail} alt="thumbnail" />
          <p className="vduration">
            {hours ? `${hours}:` : ""}
            {minutes ? `${minutes}:` : "0:"}
            {seconds}
          </p>
        </div>

        <div className="vinfo">
          <h4 className="title">
            {video.title.slice(0, 30)} {video.title.length > 25 ? "..." : ""}
          </h4>
          <div>
            <p className="channel">{video.writer?.name}</p>

            <p className="views">
              {video.views} {video.views > 0 ? "views" : "view"}
            </p>
          </div>
        </div>
      </a>
    );
  });

  return <div>{sideVideoItem}</div>;
}

export default SideVideo;
