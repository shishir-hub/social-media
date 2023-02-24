import React, { useContext, useEffect, useState } from "react";
import Post from "../posts/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

function Feed({ userId }) {
  const [posts, setPosts] = useState([]);
  const [isPostAdded, setIsPostAdded] = useState(false);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      axios
        .get(`${process.env.REACT_APP_SERVER_DOMAIN}/posts/myposts/${userId}`)
        .then((res) => {
          let data = res.data.data;
          data = data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          });
          setPosts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      axios
        .get(`${process.env.REACT_APP_SERVER_DOMAIN}/posts/timeline`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
        .then((res) => {
          let data = res.data.data;
          data = data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          });
          setPosts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [userId, isPostAdded]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {userId === user?._id || !userId ? (
          <Share isPostAdded={isPostAdded} setIsPostAdded={setIsPostAdded} />
        ) : null}
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center my-5">
            <CircularProgress />
          </div>
        ) : (
          <>
            {posts?.map((post, i) => {
              return <Post key={i} post={post} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;
