import React, { useContext, useEffect, useState } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import TWITTER from "../../assets/twitter.png";
import LINKEDIN from "../../assets/linkedin.png";
import DataContext from "../../context/DataContext";
import api from "../../api/api";

const UserWidget = ({ userId, picturePath }) => {
  const { navigate, config } = useContext(DataContext);

  const [user, setUser] = useState("");

  const { palette } = useTheme();

  const dark = palette.neutral.dark;

  const medium = palette.neutral.medium;

  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await api.get(`user/${userId}`, config);
    setUser(response.data);
  };

  useEffect(() => {
    getUser();
  }, [config]);

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  //
  return (
    <WidgetWrapper>
      {user && (
        <>
          <FlexBetween
            gap='0.5rem'
            pb='1.1rem'
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap='1rem'>
              <UserImage image={picturePath} />
              <Box>
                <Typography
                  variant='h4'
                  color={dark}
                  fontWeight='500'
                  sx={{
                    "&:hover": {
                      color: palette.primary.dark,
                      cursor: "pointer",
                    },
                  }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography color={medium}>
                  {friends?.length} friends
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <Divider />

          <Box p='1rem 0'>
            <Box
              display='flex'
              alignItems='center'
              gap='1rem'
              mb='0.5rem'
            >
              <LocationOnOutlined
                fontSize='large'
                sx={{ color: main }}
              />
              <Typography color={medium}>{location}</Typography>
            </Box>
            <Box
              display='flex'
              alignItems='center'
              gap='1rem'
            >
              <WorkOutlineOutlined
                fontSize='large'
                sx={{ color: main }}
              />
              <Typography color={medium}>{occupation}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween mb='0.5rem'>
              <Typography color={medium}>Profile Viewed</Typography>
              <Typography
                color={main}
                fontWeight='500'
              >
                {viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Impressions of your post</Typography>
              <Typography
                color={main}
                fontWeight='500'
              >
                {impressions}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <Typography
              fontSize='1rem'
              color={main}
              fontWeight='500'
              mb='1rem'
            >
              Social Profiles
            </Typography>

            <FlexBetween
              gap='1rem'
              mb='0.5rem'
            >
              <FlexBetween gap='1rem'>
                <img
                  src={TWITTER}
                  alt='twitter'
                />
                <Box>
                  <Typography
                    color={main}
                    fontWeight='500'
                  >
                    Twitter
                  </Typography>
                  <Typography color={medium}>Social Network</Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>

            <FlexBetween gap='1rem'>
              <FlexBetween gap='1rem'>
                <img
                  src={LINKEDIN}
                  alt='linkedin'
                />
                <Box>
                  <Typography
                    color={main}
                    fontWeight='500'
                  >
                    Linkedin
                  </Typography>
                  <Typography color={medium}>Network Platform</Typography>
                </Box>
              </FlexBetween>
            </FlexBetween>
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default UserWidget;
