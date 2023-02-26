import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SocialMediaContext } from "../../App";
import "./searchFriend.css";

function SearchFriend({ searchComponent, setSearchComponent }) {
  const { searchUsers } = useContext(SocialMediaContext);

  const { isOpen } = searchComponent;

  return (
    <>
      {isOpen ? (
        <div className="searchFriend">
          <div className="searchWrapper">
            <div className="foundFriends">
              <i
                onClick={() => {
                  setSearchComponent({ isOpen: false });
                }}
                className="fa-solid fa-xmark closeSearchComponent"
              ></i>

              {searchUsers ? (
                <>
                  {searchUsers?.map((user, i) => {
                    return (
                      <Link
                        onClick={() => {
                          setSearchComponent({ isOpen: false });
                        }}
                        key={i}
                        to={`/profile/${user._id}`}
                      >
                        <div className="foundFriend">
                          <img
                            className="friendImg"
                            src={
                              user?.profilePicture ||
                              "/assests/person/noAvatar.png"
                            }
                            alt=""
                          />
                          <span
                            style={{ color: "black" }}
                            className="friendName"
                          >
                            {user?.username}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <span>No Users Found</span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SearchFriend;
