import React, { useEffect, useState } from "react";
import axios from "axios";
import Videocard from "../../videocard";
import Sidebar from "../Sidebar/Sidebar";
import url from "../../../url";

function SubscriptionPage() {
  const [Videos, setVideos] = useState([]);
  const [Loading, setLoading] = useState(true);

  let variable = { userFrom: JSON.parse(localStorage.getItem("user"))._id };
  console.log(variable);
  useEffect(() => {
    axios
      .post(`${url}/video/getSubscriptionVideos`, variable)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          setLoading(false);
          setVideos(response.data.videos);
        } else {
          alert("Failed to get subscription videos");
        }
      });
  }, []);
  const loading = () => {
    return (
      <div>
        <h1>Loading......</h1>
      </div>
    );
  };
  const renderCards = Videos.map((video, index) => {
    var hours = Math.floor(video.duration / 3600);
    let secleft = video.duration - hours * 3600;
    var minutes = Math.floor(secleft / 60);
    secleft = secleft - minutes * 60;
    var seconds = Math.floor(secleft);

    return (
      <Videocard
        video={video}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      ></Videocard>
    );
  });
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <div
        className="sidebar"
        style={{
          borderRight: "1px solid lightgray",
          position: "fixed",
          left: "0",
          top: "5em",
          bottom: "0",
          width: "18vw",
          zIndex: "100",
          overflow: "scroll",
        }}
      >
        <Sidebar></Sidebar>
      </div>
      <div style={{ width: "82vw" }} className="videocontainer">
        {Loading ? loading() : renderCards}
      </div>
    </div>
  );
}
export default SubscriptionPage;
