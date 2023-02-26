import React, { useContext, useState } from "react";
import "./post.css";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(post?.likes?.length);
  const [isLiked, setIsLiked] = useState(post?.likes.includes(user?._id));

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    let data = {};
    axios
      .put(
        `${process.env.REACT_APP_SERVER_DOMAIN}/posts/${post?._id}/like`,
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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post?.posted_by?._id}`}>
              <img
                src={
                  post?.posted_by?.profilePicture ||
                  "/assests/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <div className="postDetails">
              <span className="postUsername">{post?.posted_by?.username}</span>
              <span className="postDate">{format(post?.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={likeHandler}
              className="likeIcon"
              src="/assests/like.png"
              alt=""
            />
            <img
              onClick={likeHandler}
              className="likeIcon"
              src="/assests/heart.png"
              alt=""
            />
            <span className="postLikeCounter">{like} likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post?.comment?.length || 0} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
