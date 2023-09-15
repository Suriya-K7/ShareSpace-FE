import React, { useContext, useMemo } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Forgot from "./pages/forgot/Forgot";
import ConfirmUser from "./pages/confirm/Confirm";
import { Route, Routes } from "react-router-dom";
import DataContext from "./context/DataContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Reset from "./pages/reset/Reset";
import EditProfile from "./pages/editProfile/EditProfile";
import ReportBug from "./pages/reportbug/ReportBug";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import SupportDev from "./pages/supportdev/SupportDev";

const App = () => {
  const { loggedUser, mode } = useContext(DataContext);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {!loggedUser && (
            <>
              <Route
                path='/'
                element={<Login />}
              />
              <Route
                path='/forgot'
                element={<Forgot />}
              />
              <Route
                path='/register'
                element={<Register />}
              />
              <Route
                path='/reset/:id'
                element={<Reset />}
              />
              <Route
                path='/confirm/:id'
                element={<ConfirmUser />}
              />
            </>
          )}
          {loggedUser && (
            <>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/editprofile'
                element={<EditProfile />}
              />
              <Route
                path='/reportbug'
                element={<ReportBug />}
              />
              <Route
                path='/profile/:userId'
                element={<Profile />}
              />
              <Route
                path='/supportDev'
                element={<SupportDev />}
              />
            </>
          )}
          <Route
            path='/*'
            element={<PageNotFound />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
