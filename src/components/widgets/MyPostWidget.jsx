import React, { useContext, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Try,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import DataContext from "../../context/DataContext";
import { ToastContainer, Flip, toast } from "react-toastify";
import api from "../../api/api";

const MyPostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { loggedUser, config, setPosts } = useContext(DataContext);
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.primary.main;

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

  const handlePost = async () => {
    try {
      let picturePath;

      if (image) {
        picturePath = await savePicture(image);
      }

      const data = {
        userId: loggedUser._id,
        description: post ? post : "",
        picturePath: picturePath ? picturePath : "",
      };

      const response = await api.post("/posts", data, config);

      toast.success(response.data.message);

      setPosts(response.data.post);

      setPost("");

      setImage(null);

      setIsImage(false);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            acceptedFiles='.jpg,.jpeg,.png'
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap='0.25rem'
          display='flex'
          justifyContent='center'
          alignItems='center'
          onClick={() => setIsImage(!isImage)}
          color={mediumMain}
          className='transition'
          sx={{
            "&:hover": { cursor: "pointer", color: medium, scale: "1.1" },
          }}
        >
          <ImageOutlined />
          <Typography>Image</Typography>
        </FlexBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          style={{ color: "white" }}
          className='transition scale'
          sx={{
            backgroundColor: mediumMain,
            borderRadius: "3rem",
            "&:hover": {
              cursor: "pointer",
              color: medium,
              backgroundColor: palette.primary.main,
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
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
    </WidgetWrapper>
  );
};

export default MyPostWidget;
