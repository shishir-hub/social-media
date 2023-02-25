import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import { resizeFile } from "../../imageCompressor";
import axios from "axios";

function Share({ isPostAdded, setIsPostAdded }) {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState();
  const [images, setImages] = useState();

  const handleImageChange = async (e) => {
    try {
      let file = e.target.files[0];
      let resizedImg = await resizeFile(file);
      setImages(resizedImg);
    } catch (error) {
      console.log(error);
    }
    setFile(e.target.files[0]);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    let newPost = new FormData();
    newPost.append("userId", user._id);
    newPost.append("desc", desc.current.value);
    newPost.append("img", images);

    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setIsPostAdded(!isPostAdded);
        setFile(null);
        setImages(null);
        desc.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user?.profilePicture || "/assests/person/noAvatar.png"}
            alt=""
            className="shareProfileImg"
          />
          <input
            required
            type="text"
            placeholder={`${user?.username}, What's on your mind?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={images} alt="..." />
            <i
              className="fa-solid fa-xmark shareCancelImg"
              onClick={() => {
                setFile(null);
                setImages(null);
              }}
            ></i>
          </div>
        )}
        <form className="shareBottom" onSubmit={handlePostSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <i
                style={{ color: "tomato" }}
                className="fa-solid fa-photo-film shareIcon"
              ></i>
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpg, .jpeg, .heic, .HEIC"
                onChange={(e) => {
                  handleImageChange(e);
                }}
              />
            </label>
            <div className="shareOption">
              <i
                style={{ color: "blue" }}
                className="fa-solid fa-tag shareIcon"
              ></i>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <i
                style={{ color: "green" }}
                className="fa-solid fa-location-dot shareIcon"
              ></i>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <i
                style={{ color: "goldenrod" }}
                className="fa-solid fa-face-smile shareIcon"
              ></i>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary shareButton ms-2">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
