import React, { useContext, useEffect, useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import DataContext from "../context/DataContext";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import api from "../api/api";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const { navigate, loggedUser, config, setLoggedUser } =
    useContext(DataContext);
  const [trigger, setTrigger] = useState(true);
  const _id = loggedUser._id;
  const friends = loggedUser.friends;
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = friends.includes(friendId);

  const patchFriend = async () => {
    try {
      const response = await api.patch(`/user/${_id}/${friendId}`, config);
      const FilterFriend = response.data.map((e) => e._id);
      setLoggedUser((prev) => ({
        ...prev,
        friends: [...FilterFriend],
      }));
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage
          image={userPicturePath}
          size='55px'
        />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            className='transition scale'
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography
            color={medium}
            fontSize='0.75rem'
          >
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId === loggedUser._id ? (
        ""
      ) : (
        <IconButton
          className='transition scale'
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
