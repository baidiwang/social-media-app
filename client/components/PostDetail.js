import {
  Box,
  CardActions,
  CardContent,
  CardMedia,
  createTheme,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Avatar, Card, CardHeader } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentHelper from "./CommentHelper";
import { Link } from "react-router-dom";
import SideMenu from "./SideMenu";

const PostDetail = ({ post, postUserId, auth }) => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  console.log("post", post);
  console.log("auth", auth.id);
  //   Getting Post body, Post user , Post avatar, and Post date
  const postId = post.map((singlePost) => singlePost.id);
  const postBody = post.map((singlePost) => singlePost.body);
  const postUser = post.map((singlePost) => singlePost.user.username);
  const userId = post.map((singlePost) => singlePost.user.id);
  const postUserAvatar = post.map((singlePost) => singlePost.user.avatar);
  const postDate = post.map((singlePost) => singlePost.date);
  //   get comments Array from Post
  const commentsArr = post.flatMap((singlePost) => {
    return singlePost.comments;
  });
  //   get likes Array from Post
  const likesArr = post.flatMap((singlePost) => {
    return singlePost.likes;
  });
  //   get photos Array from Post
  const photosArr = post.flatMap((singlePost) => {
    return singlePost.photos;
  });
  console.log("commentsArr", commentsArr);
  console.log("likesArr", likesArr);
  console.log("photosArr", photosArr);
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex={5}
        backgroundColor={"background.default"}
        color={"text.primary"}
        width="100vw"
      >
        <Stack
          marginTop={5}
          direction="row"
          spacing={3}
          justifyContent={"space-between"}
        >
          <SideMenu setMode={setMode} mode={mode} />
          <Card
            sx={{
              height: "80%",
              width: "80%",
            }}
          >
            <CardHeader
              avatar={
                <Link to={`/profile/${userId}`}>
                  <Avatar src={postUserAvatar} />
                </Link>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={<Link to={`/profile/${postUserId}`}>{postUser}</Link>}
              subheader={postDate}
            />
            {photosArr.map((photo) => {
              return (
                <CardMedia
                  key={photo.id}
                  component="img"
                  height="5%"
                  image={photo.photoUrl}
                />
              );
            })}
            <CardContent>
              <Box>
                <CardActions disableSpacing>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                      <FavoriteIcon />
                    </IconButton>
                    <Typography>{likesArr.length} likes</Typography>
                  </Box>
                </CardActions>
                <Box marginLeft={2}>
                  <Typography variant="h6">
                    <Link to={`/profile/${userId}`}>{postUser}</Link>
                  </Typography>
                  <Typography>{postBody}</Typography>
                </Box>
              </Box>
              <Box marginTop={3}>
                {commentsArr.map((comment) => {
                  return (
                    <Box
                      marginLeft={5}
                      marginTop={3}
                      marginBottom={1}
                      key={comment.id}
                    >
                      <Box display="flex" alignItems="center">
                        <Link to={`/profile/${comment.userId}`}>
                          <Avatar
                            sx={{ height: "30px", width: "30px" }}
                            src={comment.user.avatar}
                          />
                        </Link>
                        <Typography sx={{ fontSize: "12px", marginLeft: 1 }}>
                          <Link to={`/profile/${comment.userId}`}>
                            {comment.user.username}
                          </Link>
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: "10px" }}>
                        {comment.body}
                      </Typography>
                    </Box>
                  );
                })}
                <Box display="flex" alignItems="center" justifyContent="center">
                  <CommentHelper authId={auth.id} postId={postId} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

const mapState = ({ posts, users, auth }, { match }) => {
  console.log("postsDetail", posts);
  console.log("users", users);
  console.log("matchPost", match);
  const postId = match.params.id * 1;
  console.log("postDetail", postId);
  const post = posts.filter((post) => post.id === postId) || {};
  const postUserId = post.flatMap((singlePost) => singlePost.userId);
  console.log("singlePost", post);
  console.log("postUserId", postUserId);
  return {
    post,
    postUserId,
    auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addLike: (authId, postId) => {
      dispatch(addLike(authId, postId));
    },
    deleteLike: (likeId, postId) => {
      dispatch(deleteLike(likeId, postId));
    },
  };
};

export default connect(mapState, mapDispatch)(PostDetail);
