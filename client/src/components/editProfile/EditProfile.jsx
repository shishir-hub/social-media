import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { resizeFile } from "../../imageCompressor";
import "./editProfile.css";

function EditProfile({
  editProfile,
  setEditProfile,
  profileUpdated,
  setProfileUpdated,
}) {
  const { dispatch } = useContext(AuthContext);
  const { isOpen, profile } = editProfile;
  const [inputs, setInputs] = useState({
    username: "",
    desc: "",
    city: "",
    from: "",
    relationship: "",
    birthDate: "",
  });
  const [coverImg, setCoverImg] = useState();
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    const initializeInputs = () => {
      setInputs({
        username: profile?.username,
        desc: profile?.desc,
        city: profile?.city,
        from: profile?.from,
        relationship: profile?.relationship,
        birthDate: profile?.birthDate,
      });
      setCoverImg(profile?.coverPicture);
      setProfilePicture(profile?.profilePicture);
    };
    initializeInputs();
  }, [profile]);

  const handleCoverChange = async (e) => {
    try {
      let file = e.target.files[0];
      let resizedImg = await resizeFile(file);
      setCoverImg(resizedImg);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileChange = async (e) => {
    try {
      let file = e.target.files[0];
      let resizedImg = await resizeFile(file);
      setProfilePicture(resizedImg);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("username", e.target.username.value);
    data.append("desc", e.target.desc.value);
    data.append("city", e.target.city.value);
    data.append("from", e.target.from.value);
    data.append("relationship", e.target.relationship.value);
    data.append("birthDate", e.target.birthDate.value);
    coverImg
      ? data.append("coverPicture", coverImg)
      : data.append("coverPicture", "");
    profilePicture
      ? data.append("profilePicture", profilePicture)
      : data.append("profilePicture", "");

    const applyChanges = async () => {
      await axios
        .put(
          `${process.env.REACT_APP_SERVER_DOMAIN}/users/${profile._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        )
        .then((res) => {
          setProfileUpdated(!profileUpdated);
          setEditProfile({ ...editProfile, isOpen: false });
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    };

    // const createPost = async (img, type) => {
    //   let post = {
    //     userId: profile._id,
    //     img: img,
    //     desc:
    //       type === "profile"
    //         ? "Updated Profile Picture"
    //         : "Updated Cover Picture",
    //   };

    //   await axios
    //     .post(`${process.env.REACT_APP_SERVER_DOMAIN}/posts`, post, {
    //       headers: {
    //         Authorization: `Bearer ${JSON.parse(
    //           localStorage.getItem("token")
    //         )}`,
    //       },
    //     })
    //     .then((res) => {})
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    applyChanges();

    // profilePicture && createPost(profilePicture,'profile');

    // coverImg && createPost(coverImg,'cover');
  };

  return (
    <>
      {isOpen ? (
        <div className="back">
          <div className="edit">
            <div className="editWrapper">
              <form className="editInputs" onSubmit={handleEditSubmit}>
                <div className="editInput">
                  <label className="editLabel" htmlFor="coverImg">
                    <i className="fa-solid fa-image editIcon"></i>
                    <span className="editText">Cover Image</span>
                  </label>
                  {coverImg ? (
                    <div className="editImageContainer">
                      <i
                        onClick={() => {
                          setCoverImg();
                        }}
                        className="fa-solid fa-xmark removeImg"
                      ></i>
                      <img className="showImage" src={coverImg} alt="" />
                    </div>
                  ) : null}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept=".png, .jpg, .jpeg, .heic, .HEIC"
                    id="coverImg"
                    onChange={(e) => {
                      handleCoverChange(e);
                    }}
                  />
                </div>
                <div className="editInput">
                  <label className="editLabel" htmlFor="profileImg">
                    <i className="fa-regular fa-image editIcon"></i>
                    <span className="editText">Profile Image</span>
                  </label>
                  {profilePicture ? (
                    <div className="editImageContainer">
                      <i
                        onClick={() => {
                          setProfilePicture();
                        }}
                        className="fa-solid fa-xmark removeImg"
                      ></i>
                      <img className="showImage" src={profilePicture} alt="" />
                    </div>
                  ) : null}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept=".png, .jpg, .jpeg, .heic, .HEIC"
                    id="profileImg"
                    onChange={(e) => {
                      handleProfileChange(e);
                    }}
                  />
                </div>
                <div className="editInput">
                  <label className="editLabel" htmlFor="username">
                    <i className="fa-solid fa-user-tie editIcon"></i>
                    <span className="editText">Username</span>
                  </label>
                  <input
                    required
                    value={inputs.username}
                    placeholder="User..."
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="editInput">
                  <label className="editLabel" htmlFor="desc">
                    <i className="fa-solid fa-lightbulb editIcon"></i>
                    <span className="editText">Description</span>
                  </label>
                  <input
                    value={inputs.desc}
                    placeholder="Desc..."
                    type="text"
                    name="desc"
                    id="desc"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="editInput">
                  <label className="editLabel" htmlFor="city">
                    <i className="fa-solid fa-city editIcon"></i>
                    <span className="editText">City</span>
                  </label>
                  <input
                    value={inputs.city}
                    placeholder="Butwal..."
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="editInput">
                  <label className="editLabel" htmlFor="from">
                    <i className="fa-solid fa-earth-americas editIcon"></i>
                    <span className="editText">From(Country)</span>
                  </label>
                  <input
                    value={inputs.from}
                    placeholder="Nepal..."
                    type="text"
                    name="from"
                    id="from"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="editInput">
                  <label className="editLabel" htmlFor="relationship">
                    <i className="fa-solid fa-heart editIcon"></i>
                    <span className="editText">Relationship</span>
                  </label>
                  <select
                    defaultValue={inputs.relationship}
                    onChange={handleInputChange}
                    name="relationship"
                    id="relationship"
                  >
                    <option value="1">Single</option>
                    <option value="2">In Relationship</option>
                    <option value="3">Complicated</option>
                  </select>
                </div>
                <div className="editInput">
                  <label className="editLabel" htmlFor="birthDate">
                    <i className="fa-solid fa-cake-candles editIcon"></i>
                    <span className="editText">Birthday</span>
                  </label>
                  <input
                    value={inputs.birthDay}
                    onChange={handleInputChange}
                    type="date"
                    name="birthDate"
                    id="birthDate"
                  />
                </div>

                <div className="editButtons my-3">
                  <button type="submit" className="btn btn-success mx-2">
                    Apply
                  </button>
                  <button
                    onClick={() => {
                      setEditProfile({ ...editProfile, isOpen: false });
                    }}
                    className="btn btn-danger mx-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EditProfile;
