import React, { useContext } from "react";
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
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import useRazorpay from "react-razorpay";
import DataContext from "../../context/DataContext";

const SupportDev = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { palette } = useTheme();

  const { loggedUser } = useContext(DataContext);

  const [Razorpay] = useRazorpay();

  const validateSchema = yup.object({
    amount: yup
      .number()
      .positive("Amount can't start with a minus")
      .integer("Amount number can't include a decimal point")
      .min(1)
      .required("Amount value is required"),
  });

  const initialValues = {
    amount: "",
  };

  const handlesubmit = async (values) => {
    const options = {
      key: import.meta.env.VITE_RAZAR_KEY,
      key_secret: import.meta.env.VITE_RAZAR_SECRET,
      amount: values.amount * 100,
      currency: "INR",
      name: "Suriya Corp",
      description: "Test Transaction",
      image:
        "https://clipart-library.com/image_gallery2/Superman-Logo-Free-Download-PNG.png",
      handler: (res) => {
        console.log(res);
        toast.success(`Payment Success, Payment ID:${res.razorpay_payment_id}`);
      },
      prefill: {
        name: loggedUser.firstName,
        email: loggedUser.email,
        contact: loggedUser.contactNo,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzpay = new Razorpay(options);

    rzpay.open();
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
          <h2>Hi, I'm Suriya-K7</h2>
          <p>
            If, You want to Support the Developer and creators. Please Donate.
          </p>
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
            Donate
          </Typography>
          <Formik
            onSubmit={handlesubmit}
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
              <form onSubmit={handleSubmit}>
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
                    label='Amount'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.from_name}
                    name='amount'
                    error={Boolean(touched.amount) && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
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
                    Donate
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

export default SupportDev;
