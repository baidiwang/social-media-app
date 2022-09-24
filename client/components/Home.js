//landing page / newsfeed

import React, { useState } from "react";
import { connect } from "react-redux";
import PostCreateForm from "./PostCreateForm";
import { Link } from "react-router-dom";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Feed from "./Feed";
import SideMenu from "./SideMenu";
import FAB from "./FAB";

/**
 * COMPONENT
 */
export const Home = ({ username, posts }) => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box backgroundColor={"background.default"} color={"text.primary"}>
        <Stack direction="row" spacing={5} justifyContent={"space-between"}>
          <SideMenu setMode={setMode} mode={mode} />
          <Feed />
        </Stack>
        <FAB />
      </Box>
    </ThemeProvider>
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
