//landing page / newsfeed

import React from "react";
import { connect } from "react-redux";
import PostCreateForm from "./PostCreateForm";
import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Feed from "./Feed";
import SideMenu from "./SideMenu";
import FAB from "./FAB";

/**
 * COMPONENT
 */
export const Home = ({ username, posts }) => {
  return (
    <Box>
      <Stack direction="row" spacing={5} justifyContent={"space-between"}>
        <SideMenu />
        <Feed />
      </Stack>
      <FAB />
    </Box>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    posts: state.posts,
  };
};

export default connect(mapState)(Home);
