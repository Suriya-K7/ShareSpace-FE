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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DataContext from "../../context/DataContext";
import { ToastContainer, Flip, toast } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

const EditProfile = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { loggedUser, handleEditProfile, handlePasswordUpdate } =
    useContext(DataContext);

  const theme = useTheme();

  const { palette } = useTheme();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    contactNo: yup.number().required("required"),
  });

  const paswordSchema = yup.object().shape({
    oldpassword: yup.string().required("required"),
    password: yup.string().required("required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password Must Match")
      .required("required"),
  });

  const initialValuesPassword = {
    oldpassword: "",
    password: "",
    cpassword: "",
  };

  const initialValuesRegister = {
    firstName: loggedUser?.firstName,
    lastName: loggedUser?.lastName,
    email: loggedUser?.email,
    location: loggedUser?.location,
    occupation: loggedUser?.occupation,
    picture: loggedUser?.picturePath,
    contactNo: loggedUser?.contactNo,
  };

  const savePicture = async (data) => {
    try {
      // Handle Image upload
      let imageURL;
      if (
        data &&
        (data.type === "image/jpeg" ||
          data.type === "image/jpg" ||
          data.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", data);
        image.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
        image.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        // First save image to cloudinary
        const response = await fetch(`${import.meta.env.VITE_URL}`, {
          method: "post",
          body: image,
        });
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        // Save Profile
        return imageURL;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      let picturePath;
      if (typeof values.picture === "string") {
        picturePath = values.picture;
      } else {
        picturePath = await savePicture(values.picture);
      }

      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        picturePath: picturePath,
        location: values.location,
        occupation: values.occupation,
        contactNo: values.contactNo,
      };

      await handleEditProfile(data);

      onSubmitProps.resetForm();
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleSubmitPassword = async (values, onSubmitProps) => {
    const data = {
      oldpassword: values.oldpassword,
      password: values.password,
    };
    await handlePasswordUpdate(data);

    onSubmitProps.resetForm();
  };

  return (
    <Box>
      <NavBar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='0.5rem'
        justifyContent='center'
      >
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
            Update Profile
          </Typography>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValuesRegister}
            validationSchema={registerSchema}
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
                    label='First Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='firstName'
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label='Last Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='lastName'
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label='Contact No.'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.contactNo}
                    name='contactNo'
                    error={
                      Boolean(touched.contactNo) && Boolean(errors.contactNo)
                    }
                    helperText={touched.contactNo && errors.contactNo}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label='Location'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name='location'
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label='Occupation'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name='occupation'
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn='span 4'
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius='5px'
                    p='1rem'
                  >
                    <Dropzone
                      acceptedFiles='.jpg,.jpeg,.png'
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p='1rem'
                          overflow='hidden'
                          sx={{
                            "&:hover": { cursor: "pointer" },
                          }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>
                                {values.picture.name
                                  ? values.picture.name
                                  : values.picture}
                              </Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                  <TextField
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    disabled
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
                    Update Profile
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p='2rem'
          m='2rem auto'
          borderRadius='1.5rem'
          backgroundColor={theme.palette.background.alt}
          height='450px'
        >
          <Typography
            fontWeight='400'
            variant='h2'
            align='center'
            color='primary'
            sx={{ mb: "1.5rem" }}
          >
            Update Password
          </Typography>
          <Formik
            onSubmit={handleSubmitPassword}
            initialValues={initialValuesPassword}
            validationSchema={paswordSchema}
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
                    type='password'
                    label='Old Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oldpassword}
                    name='oldpassword'
                    error={
                      Boolean(touched.oldpassword) &&
                      Boolean(errors.oldpassword)
                    }
                    helperText={touched.oldpassword && errors.oldpassword}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    type='password'
                    label='New Password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name='password'
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    type='password'
                    label='Confirm Password'
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
                    Update Password
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

export default EditProfile;
