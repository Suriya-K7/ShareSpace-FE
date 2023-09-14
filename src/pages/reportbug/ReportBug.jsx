import React, { useRef } from "react";
import NavBar from "../navbar/Navbar";
import {
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ToastContainer, Flip, toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./reportbug.css";

const ReportBug = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { palette } = useTheme();
  const SERVICE = import.meta.env.VITE_SERVICE;
  const TEMPLETE = import.meta.env.VITE_TEMPLETE;
  const PUBLIC = import.meta.env.VITE_PUBLIC;
  const form = useRef();
  const validateSchema = yup.object({
    from_name: yup
      .string()
      .max(15, "should be less than 15 Characters")
      .min(3, "should be more than 3 Characters")
      .required("Required"),
    from_email: yup.string().email("Email is Invalid").required("Required"),
    from_subject: yup
      .string()
      .max(25, "should be less than 15 Characters")
      .min(6, "should be more than 6 Characters")
      .required("Required"),
    message: yup
      .string()
      .max(100, "should be less than 100 Characters")
      .min(10, "should be more than 10 Characters")
      .required("Required"),
  });

  const initialValues = {
    from_name: "",
    from_email: "",
    from_subject: "",
    message: "",
  };

  const sendEmail = () => {
    emailjs.sendForm(SERVICE, TEMPLETE, form.current, PUBLIC).then(
      (result) => {
        toast.success("Thanks for contacting us!");
      },
      (error) => {
        toast.error("Server error Please try again later!");
        console.log(error);
      }
    );
  };

  return (
    <Box>
      <NavBar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='2rem'
        justifyContent='center'
      >
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p='2rem'
          m='2rem auto'
          borderRadius='1.5rem'
          height='300px'
          backgroundColor={theme.palette.background.alt}
        >
          <h2>Our Contact Information</h2>
          <p>Fill the form or contact us via other channels listed below</p>
          <div className='info'>
            <span>
              <LocalPhoneIcon /> +91-7639718893
            </span>
            <span>
              <ContactMailIcon />
              usraising@gmail.com
            </span>
            <span>
              <LocationOnIcon />
              Chennai, Tamil Nadu, India
            </span>
            <span>
              <GitHubIcon />
              <a
                href='https://github.com/Suriya-K7'
                target='_blank'
                className='scale transition'
              >
                Suriya-K7
              </a>
            </span>
          </div>
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
            variant='h2'
            align='center'
            color='primary'
            sx={{ mb: "1.5rem" }}
          >
            Send Report
          </Typography>
          <Formik
            onSubmit={sendEmail}
            initialValues={initialValues}
            validationSchema={validateSchema}
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
              <form
                ref={form}
                onSubmit={handleSubmit}
              >
                <Box
                  display='grid'
                  gap='30px'
                  gridTemplateColumns='repeat(4,minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    label='Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.from_name}
                    name='from_name'
                    error={
                      Boolean(touched.from_name) && Boolean(errors.from_name)
                    }
                    helperText={touched.from_name && errors.from_name}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.from_email}
                    name='from_email'
                    error={
                      Boolean(touched.from_email) && Boolean(errors.from_email)
                    }
                    helperText={touched.from_email && errors.from_email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label='Subject'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.from_subject}
                    name='from_subject'
                    error={
                      Boolean(touched.from_subject) &&
                      Boolean(errors.from_subject)
                    }
                    helperText={touched.from_subject && errors.from_subject}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label='Message'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.message}
                    name='message'
                    error={Boolean(touched.message) && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
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
                    Send
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
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

export default ReportBug;
