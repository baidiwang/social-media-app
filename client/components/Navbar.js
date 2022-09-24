import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { setUsers } from "../store/user";
import { AppBar, Toolbar, styled, Avatar, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VideocamIcon from "@mui/icons-material/Videocam";
import Search from "./Search";

const Navbar = ({ handleClick, isLoggedIn, auth }) => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      {isLoggedIn
        ? [
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Link style={{ color: "white" }} to="/home">
                Social App
              </Link>
              <Search />
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Link style={{ color: "white" }} to="/videos">
                  <VideocamIcon style={{ fontSize: "1.5rem" }} />
                </Link>
                <Link style={{ color: "white" }} to="/messages">
                  <MessageIcon style={{ fontSize: "1.2rem" }} />
                </Link>
                <Avatar
                  sx={{ height: "30px", width: "30px" }}
                  src={auth.avatar}
                  onClick={(event) => setOpen(true)}
                />
              </Box>
            </Toolbar>,
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={open}
              onClose={(event) => setOpen(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Link to={`/profile/${auth.id}`}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link to="#" onClick={handleClick}>
                <MenuItem>Logout</MenuItem>
              </Link>
            </Menu>,
          ]
        : [
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link style={{ color: "white" }} to="/home">
                Social App
              </Link>
              <Box sx={{ display: "flex", gap: 5 }}>
                <Link style={{ color: "white" }} to="/login">
                  Login
                </Link>
                <Link style={{ color: "white" }} to="signup">
                  Register
                </Link>
              </Box>
            </Toolbar>,
          ]}
    </AppBar>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
