import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import DataContext from "../../context/DataContext";
import api from "../../api/api";

const FriendListWidget = ({ userId }) => {
  const { palette } = useTheme();
  const [friends, setFriends] = useState([]);
  const { config, loggedUser } = useContext(DataContext);

  const getFriends = async () => {
    const response = await api.get(`/user/friends/${userId}`, config);
    setFriends(response.data);
  };

  useEffect(() => {
    getFriends();
  }, [config, loggedUser]);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box
        display='flex'
        flexDirection='column'
        gap='1.5rem'
      >
        {friends &&
          friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        {!friends.length && "No Friends"}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
