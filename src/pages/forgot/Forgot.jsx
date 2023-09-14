import React, { useContext } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import DataContext from "../../context/DataContext";
import FlexBetween from "../../components/FlexBetween";
import { Link } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

const Forgot = () => {
  const theme = useTheme();

  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { handleForgot } = useContext(DataContext);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const schema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
  });

  const initialValues = {
    email: "",
  };

  const handleSubmit = (values, onSubmitProps) => {
    const data = {
      email: values.email,
    };

    handleForgot(data);

    onSubmitProps.resetForm();
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
          variant='h3'
          align='center'
          color='primary'
          sx={{ mb: "1.5rem" }}
        >
          Forgot Password
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
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
                  forgot
                </Button>
                <FlexBetween>
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
                      Already have an account? Sign In here.
                    </Typography>
                  </Link>

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
                </FlexBetween>
              </Box>
            </form>
          )}
        </Formik>
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

export default Forgot;
