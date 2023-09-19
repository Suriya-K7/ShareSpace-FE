import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  Scale,
} from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import DataContext from "../../context/DataContext";
import FlexBetween from "../../components/FlexBetween";
import { Link } from "react-router-dom";
import { ToastContainer, Flip, toast } from "react-toastify";

const Login = () => {
  const theme = useTheme();

  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { handleSignIn, handleMode } = useContext(DataContext);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [open, openchange] = useState(false);

  const dark = theme.palette.neutral.dark;

  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  const schema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };

      handleSignIn(data);

      onSubmitProps.resetForm();
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
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
          <IconButton
            className='login__color__mode'
            style={{ float: "right" }}
            onClick={handleMode}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
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
          fontSize='clamp(1rem, 1.25rem, 1.5rem)'
          variant='h4'
          color='primary'
          align='center'
          sx={{ mb: "1.5rem" }}
        >
          Welcome to ShareSpace, Social Media App for Sociopaths!
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValuesLogin}
          validationSchema={schema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display='grid'
                gap='30px'
                gridTemplateColumns='repeat(4,minmax(0, 1fr))'
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label='Email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label='Password'
                  type='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name='password'
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  type='submit'
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  LOGIN
                </Button>
                <FlexBetween>
                  <Link to={"/register"}>
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
                      Don't have an account? Sign Up here.
                    </Typography>
                  </Link>
                  <Link to={"/forgot"}>
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
                      Forgot Password?
                    </Typography>
                  </Link>
                </FlexBetween>
              </Box>
            </form>
          )}
        </Formik>
        <Button
          fullWidth
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": {
              color: palette.primary.main,
            },
          }}
          onClick={functionopenpopup}
        >
          Demo Credentials
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle>
          <Typography
            fontWeight='400'
            fontSize='1.5rem'
            color='primary'
            align='center'
          >
            Welcome to ShareSpace, the Social Media for Sociopaths!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            fontWeight='400'
            fontSize='1rem'
            color='primary'
            align='justify'
          >
            ShareSpace app is a vibrant platform where you can capture and share
            your life's memorable moments through photos and stories. Stay
            connected with friends.
          </Typography>
          <hr />
          <Typography
            fontWeight='400'
            color='primary'
          >
            for Login use below ID or create new one:
          </Typography>
          <Typography
            fontWeight='400'
            color='primary'
          >
            Email:
          </Typography>
          demo@gmail.com
          <br />
          <Typography
            fontWeight='400'
            color='primary'
          >
            Password:
          </Typography>
          demo@123
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closepopup}
            color='error'
            variant='contained'
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
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

export default Login;
