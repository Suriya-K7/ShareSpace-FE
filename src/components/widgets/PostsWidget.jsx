import React, { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import api from "../../api/api";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const {
    posts,
    token,
    config,
    fetchAllPosts,
    loggedUser,
    setPosts,
    setTrigger,
    setLoggedUser,
  } = useContext(DataContext);

  // fetch user post
  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/posts/${userId}`, config);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      fetchUserPosts();
    } else {
      fetchAllPosts();
    }
  }, [token, config, setTrigger, loggedUser, setLoggedUser]);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
