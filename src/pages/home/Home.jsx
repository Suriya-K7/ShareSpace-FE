import React, { useContext } from "react";
import NavBar from "../navbar/Navbar";
import UserWidget from "../../components/widgets/UserWidget";
import MyPostWidget from "../../components/widgets/MyPostWidget";
import { Box, useMediaQuery } from "@mui/material";
import DataContext from "../../context/DataContext";
import { ToastContainer, Flip, toast } from "react-toastify";
import PostsWidget from "../../components/widgets/PostsWidget";
import FriendListWidget from "../../components/widgets/FriendListWidget";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { loggedUser } = useContext(DataContext);

  return (
    <Box>
      <NavBar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={loggedUser._id}
            picturePath={loggedUser.picturePath}
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={loggedUser.picturePath} />
          <PostsWidget userId={loggedUser._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <FriendListWidget userId={loggedUser._id} />
          </Box>
        )}
      </Box>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        transition={Flip}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </Box>
  );
};

export default Home;
