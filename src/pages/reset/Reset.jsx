import React, { useContext, useEffect } from "react";
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
import { Link, useParams } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";

const Reset = () => {
  const theme = useTheme();

  const { id } = useParams();

  const { palette } = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const { setResetToken, handleReset } = useContext(DataContext);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setResetToken(id);
  }, []);

  const schema = yup.object().shape({
    password: yup.string().required("required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password Must Match")
      .required("required"),
  });

  const intialValues = {
    password: "",
    cpassword: "",
  };

  const handleSubmit = (values, onSubmitProps) => {
    const data = {
      password: values.password,
    };

    handleReset(data);

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
          Reset Password
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={intialValues}
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
                <TextField
                  label='Confirm Password'
                  type='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cpassword}
                  name='cpassword'
                  error={
                    Boolean(touched.cpassword) && Boolean(errors.cpassword)
                  }
                  helperText={touched.cpassword && errors.cpassword}
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
                  reset
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

export default Reset;
