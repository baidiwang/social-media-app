import React from "react";
import { connect } from "react-redux";
import { Box, Stack } from "@mui/material";
import SideMenu from "./SideMenu";

const Explore = ({ posts }) => {
  return (
    <Box>
      <Stack>
        <SideMenu />
      </Stack>
    </Box>
  );
};

const mapState = ({ posts }) => {
  return {
    posts,
  };
};

export default connect(mapState)(Explore);
