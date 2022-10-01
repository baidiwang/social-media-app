//landing page / newsfeed

import React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import PostHelper from "./PostHelper";

const Feed = ({ posts, auth, photos }) => {
  return (
    <Box flex={5} p={1}>
      <PostHelper posts={posts} auth={auth} photos={photos} />
    </Box>
  );
};

const mapState = (state) => {
  const followedList = [];
  state.connections.map((connection) => {
    if (
      connection.followingId === state.auth.id &&
      connection.isAccepted === true
    ) {
      followedList.push(connection.followerId);
    }
  });
  const posts =
    state.posts.filter(
      (post) =>
        followedList.includes(post.userId) || post.userId === state.auth.id
    ) || [];
  return {
    posts,
    auth: state.auth,
    photos: state.photos,
  };
};

export default connect(mapState)(Feed);