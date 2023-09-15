import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  Scale,
} from "@mui/icons-material";
import BugReportIcon from "@mui/icons-material/BugReport";
import LogoutIcon from "@mui/icons-material/Logout";
import FlexBetween from "../../components/FlexBetween";
import DataContext from "../../context/DataContext";
import { ManageAccountsOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const { navigate, handleMode, handleLogout, loggedUser } =
    useContext(DataContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  const fullName = `${loggedUser?.firstName} ${loggedUser?.lastName}`;

  //
  return (
    <FlexBetween
      padding='1rem 6%'
      backgroundColor={alt}
      className='sticky'
    >
      <FlexBetween gap='1.75rem'>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.25rem)'
          color='primary'
          transition='0.3s'
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          className='transition scale'
        >
          ShareSpace
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius='9px'
            gap='3rem'
            padding='0.1rem 1.5rem'
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap='1.5rem'>
          {isNonMobileScreens && (
            <Typography
              fontWeight='light'
              fontSize='1rem'
              color='primary'
              transition='0.3s'
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              className='transition scale'
            >
              Hi {fullName}
            </Typography>
          )}
          <IconButton onClick={handleMode}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Link to={"/editprofile"}>
            <IconButton>
              <ManageAccountsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>
          </Link>
          <Link to={"/supportdev"}>
            <IconButton>
              <VolunteerActivismIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          </Link>
          <Link to={"/reportbug"}>
            <IconButton>
              <BugReportIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          </Link>
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}
      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='10'
          maxWidth='500px'
          minWidth='300px'
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box
            display='flex'
            justifyContent='flex-end'
            p='1rem'
          >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap='3rem'
          >
            <Typography
              fontWeight='light'
              fontSize='1rem'
              color='primary'
              transition='0.3s'
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              className='transition scale'
            >
              Hi {fullName}
            </Typography>
            <IconButton onClick={handleMode}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Link to={"/editprofile"}>
              <IconButton>
                <ManageAccountsOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
            </Link>
            <Link to={"/supportdev"}>
              <IconButton>
                <VolunteerActivismIcon sx={{ fontSize: "25px" }} />
              </IconButton>
            </Link>
            <Link to={"/reportbug"}>
              <IconButton>
                <BugReportIcon sx={{ fontSize: "25px" }} />
              </IconButton>
            </Link>

            <IconButton onClick={handleLogout}>
              <LogoutIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
