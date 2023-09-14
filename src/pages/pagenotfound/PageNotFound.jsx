import React from "react";
import {
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

const PageNotFound = () => {
  const theme = useTheme();

  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  //
  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='0.75rem 6%'
        textAlign='center'
      >
        <Typography
          fontWeight='bold'
          fontSize='32px'
          color='primary'
          className='scale transition'
        >
          <Link to={"/"}>ShareSpace</Link>
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p='2rem'
        m='1rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight='400'
          fontSize='clamp(1rem, 1.25rem, 1.5rem)'
          variant='h4'
          color='primary'
          align='center'
          sx={{ mb: "1.25rem" }}
        >
          Page Not Found !!! Please visit out home page
        </Typography>
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: "0.75rem" }}
          src='https://static.vecteezy.com/system/resources/previews/007/162/540/original/error-404-page-not-found-concept-illustration-web-page-error-creative-design-modern-graphic-element-for-landing-page-infographic-icon-free-vector.jpg'
        />
        <Link to='/'>
          <Button
            fullWidth
            sx={{
              mt: "1rem",
              p: "0.5rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            Go Back To Home
          </Button>
        </Link>
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

export default PageNotFound;
