import React, { useContext, useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import FriendListWidget from "../../components/widgets/FriendListWidget";
import MyPostWidget from "../../components/widgets/MyPostWidget";
import PostsWidget from "../../components/widgets/PostsWidget";
import UserWidget from "../../components/widgets/UserWidget";
import DataContext from "../../context/DataContext";
import api from "../../api/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { config } = useContext(DataContext);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await api.get(`/user/${userId}`, config);
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, [config]);

  return (
    <Box>
      <Navbar />
      {user && (
        <>
          <Box
            width='100%'
            padding='2rem 6%'
            display={isNonMobileScreens ? "flex" : "block"}
            gap='2rem'
            justifyContent='center'
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              <UserWidget
                userId={userId}
                picturePath={user.picturePath}
              />
              <Box m='2rem 0' />
              <FriendListWidget userId={userId} />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <MyPostWidget picturePath={user.picturePath} />
              <Box m='2rem 0' />
              <PostsWidget
                userId={userId}
                isProfile
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
