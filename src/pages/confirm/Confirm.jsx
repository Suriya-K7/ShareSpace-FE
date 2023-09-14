import React, { useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DataContext from "../../context/DataContext";
import FlexBetween from "../../components/FlexBetween";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

const Confirm = () => {
  const theme = useTheme();

  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { setResetToken, handleConfirm } = useContext(DataContext);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { id } = useParams();

  useEffect(() => {
    setResetToken(id);
  }, []);
  //
  return (
    <Box>
      <Box
        width='100%'
        backgroundColor={theme.palette.background.alt}
        p='1rem 6%'
        textAlign='center'
      >
        <Typography
          fontWeight='bold'
          fontSize='32px'
          color='primary'
        >
          ShareSpace
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          fontWeight='400'
          variant='h4'
          align='center'
          color='primary'
        >
          Please Click Below Button to Activate Account
        </Typography>
        <Box>
          <Button
            fullWidth
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
            onClick={handleConfirm}
          >
            Activate Account
          </Button>
          <Box textAlign='center'>
            <Link to={"/"}>
              <Typography
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.dark,
                  },
                }}
              >
                Already Activated Account? Sign In here.
              </Typography>
            </Link>
          </Box>
        </Box>
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

export default Confirm;
