import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // variables and functions
  const [mode, setMode] = useState("dark");
  const [loggedUser, setLoggedUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [Trigger, setTrigger] = useState(true);
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  // handle signin

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setLoggedUser(user.user);
      setToken(user.token);
      setConfig({
        headers: {
          authorization: `bearer ${user.token}`,
        },
      });
    }
    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSignIn = async (data) => {
    try {
      const response = await api.post("/api/users/login", data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      setLoggedUser(response.data.user);
      setToken(response.data.token);
      setConfig({
        headers: {
          authorization: `bearer ${response.data.token}`,
        },
      });
      navigate("/");
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  // // handle signout
  const handleLogout = () => {
    setToken(null);
    setLoggedUser(null);
    navigate("/");
    localStorage.clear();
  };

  // // handle sign up
  const handleSignUp = async (data) => {
    try {
      const response = await api.post("/api/users/register", data);
      toast.success(response.data.message);
      toast.success("Check your Mail & Activate");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  // // handle account confirming
  const handleConfirm = async () => {
    try {
      await api.patch(`/api/users/confirm/${resetToken}`);
      toast.success("Account confirmed Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  // // handle forgot password
  const handleForgot = async (data) => {
    try {
      await api.put("/api/users/forgotpassword", data);

      toast.success("Reset link send to your mail");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  // // handle password reset
  const handleReset = async (data) => {
    try {
      const response = await api.patch(
        `/api/users/resetpassword/${resetToken}`,
        data
      );

      setResetToken("");

      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  //handle edit profile
  const handleEditProfile = async (data) => {
    try {
      const response = await api.patch(`/api/users/updateuser`, data, config);
      const user = response.data.user;
      const localStorageData = { user, token };
      localStorage.setItem("loggedInUser", JSON.stringify(localStorageData));
      setLoggedUser(response.data.user);
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  // handle password update
  const handlePasswordUpdate = async (data) => {
    try {
      const response = await api.patch(
        `/api/users/changepassword`,
        data,
        config
      );

      toast.success(response.data.message);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  // fetch all post
  const fetchAllPosts = async () => {
    try {
      const response = await api.get("/posts", config);
      setPosts(response.data);
      setTrigger(!Trigger);
    } catch (error) {
      console.log(error);
    }
  };

  // handle Theme
  const handleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  //

  return (
    <DataContext.Provider
      value={{
        mode,
        setMode,
        loggedUser,
        setLoggedUser,
        token,
        setToken,
        resetToken,
        setResetToken,
        navigate,
        config,
        setConfig,
        posts,
        setPosts,
        handleSignIn,
        handleSignUp,
        handleForgot,
        handleReset,
        handleLogout,
        handleMode,
        handleConfirm,
        fetchAllPosts,
        Trigger,
        setTrigger,
        handleEditProfile,
        handlePasswordUpdate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
