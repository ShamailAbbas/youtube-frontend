import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../../url";
import Defaultthumbnail from "../../../assets/images/Defaultthumbnail.jpg";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Catogory = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Sports" },
];

function UploadVideoPage(props) {
  const user = useSelector((state) => state.user);
  const [selectedvideo, setselectedvideo] = useState("");
  const [selectedthumbnail, setselectedthumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [Categories, setCategories] = useState("Film & Animation");
  const [Duration, setDuration] = useState("0:06");
  const [uploading, setuploading] = useState(false);

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    console.log(event.currentTarget.value);

    setDescription(event.currentTarget.value);
  };

  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value);
  };

  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    setuploading(true);
    event.preventDefault();

    if (
      title === "" ||
      Description === "" ||
      Categories === "" ||
      selectedvideo === "" ||
      Duration === "" ||
      selectedthumbnail === ""
    ) {
      return alert("Please first fill all the fields");
    }

    //....................................................
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(
      "The selected file's details are ",
      selectedvideo,
      "the selected image is ",
      selectedthumbnail
    );

    formData.append("video", selectedvideo);

    axios
      .post(`${url}/upload/uploadvideo/`, formData, config)
      .then((response) => {
        console.log(
          "The response after trying to upload the video is ",
          response
        );
        if (response.data.success) {
          console.log(response.data);

          const details = new FormData();
          details.append("writer", user.userData._id);
          details.append("filePath", response.data.filePath);
          details.append("fileName", response.data.fileName);
          details.append("thumbnail", selectedthumbnail);
          details.append("title", title);
          details.append("description", Description);
          details.append("privacy", privacy);
          details.append("category", Categories);
          details.append("duration", Duration);

          axios
            .post(`${url}/upload/uploadthumbnail/`, details, config)
            .then((response) => {
              console.log(
                "The response after trying to upload the video is ",
                response
              );
              if (response.data.success) {
                console.log(response.data);
                alert("Uploading Successfully");
                props.history.push("/");
                setuploading(false);
              } else {
                alert("Failed to Upload the Video");
                setuploading(false);
              }
            });
        }
      });
  };
  const onVideoDrop = (files) => {
    setselectedvideo(files[0]);
  };
  const onImageDrop = (files) => {
    setselectedthumbnail(files[0]);
  };
  return (
    <div
      style={{
        maxWidth: "350px",
        margin: ".8rem auto",
        padding: "1em",
        border: "2px solid lightgray",
        borderRadius: "10px",
        boxShadow: "3px 3px 3px rgba(5, 150, 24, 0.123)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}></div>

      <form onSubmit={onSubmit}>
        <div>
          <Dropzone onDrop={onVideoDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "100px",
                  border: "1px solid gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1em",
                }}
                {...getRootProps()}
              >
                Drag and drop a video here or click to choose one
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>

          {selectedvideo !== "" && (
            <div
              style={{
                color: "green",
              }}
            >
              Video Selected
            </div>
          )}
          <Dropzone onDrop={onImageDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  marginTop: "20px",
                  width: "300px",
                  height: "50px",
                  border: "1px solid gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1em",
                }}
                {...getRootProps()}
              >
                Drag and drop an image for thumbnail here or click to choose one
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          {selectedthumbnail !== "" && (
            <div
              style={{
                color: "green",
              }}
            >
              Thumbnail Selected
            </div>
          )}
        </div>

        <br />
        <br />

        <input
          style={{
            padding: ".5em 1em",
            margin: "0",
            width: "300px",
          }}
          onChange={handleChangeTitle}
          value={title}
          placeholder="Title"
        />
        <br />
        <br />

        <textarea
          style={{ padding: ".5em 1em", margin: "0", width: "300px" }}
          onChange={handleChangeDecsription}
          value={Description}
          placeholder="Description"
        />
        <br />
        <br />

        <select
          style={{ padding: ".5em 1em", margin: "0", width: "300px" }}
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
          style={{ padding: ".5em 1em", margin: "0", width: "300px" }}
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
            padding: ".5em 1em",
            margin: "0",
            width: "300px",
            border: "transparent",
            borderRadius: "20px",
            backgroundColor: "#3f3f3f",
            color: "white",
          }}
          onClick={onSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadVideoPage;
