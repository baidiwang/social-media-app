import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  createTheme,
  Stack,
  ThemeProvider,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red, grey, pink } from "@mui/material/colors";
import {
  addLike,
  deleteLike,
  deletePost,
  deletePhoto,
  deleteComment,
} from "../store";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";
import CommentHelper from "./CommentHelper";
import CommentFAB from "./CommentFAB";

const SinglePost = ({
  auth,
  post,
  user,
  photos,
  likes,
  comments,
  addLike,
  deleteLike,
  deletePost,
  deleteComment,
}) => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const checkLike = (post, auth) => {
    const postLikes = post.likes || [];
    console.log("likes", postLikes);
    const like = postLikes.find((like) => like.userId === auth.id);
    return like;
  };
  const unLike = (auth, post) => {
    const like = checkLike(post, auth);
    deleteLike(like.id, post.id);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex={10}
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
                <Link to={`/profile/${post.userId}`}>
                  <Avatar src={user.avatar} />
                </Link>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Link to={`/profile/${post.userId}`}>{user.username}</Link>
              }
              subheader={post.date}
            />
            {photos.map((photo) => {
              return (
                <CardMedia
                  key={photo.id}
                  component="img"
                  sx={{
                    height: "70%",
                    width: "70%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                  image={photo.photoUrl}
                />
              );
            })}
            <CardContent>
              <CardActions disableSpacing>
                {checkLike(post, auth) ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => unLike(auth, post)}>
                      <FavoriteIcon sx={{ color: pink[500] }} />
                    </IconButton>
                    <Typography>{likes.length} likes</Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => addLike(auth.id, post.id)}>
                      <FavoriteIcon sx={{ color: grey[100] }} />
                    </IconButton>
                    <Typography>{likes.length} likes</Typography>
                  </Box>
                )}
              </CardActions>
              <Box marginLeft={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Link to={`/profile/${user.id}`}>
                    <Avatar src={user.avatar} />
                  </Link>
                  <Link to={`/profile/${user.id}`}>
                    <Typography variant="h6">{user.username}</Typography>
                  </Link>
                </Box>
                <Typography>{post.body}</Typography>
              </Box>
              <Box marginTop={3}>
                {comments.map((comment) => {
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
                      <Typography sx={{ fontSize: "10px", marginLeft: "40px" }}>
                        {comment.body}
                      </Typography>
                    </Box>
                  );
                })}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                ></Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
        <CommentFAB authId={auth.id} postId={post.id} />
      </Box>
    </ThemeProvider>
  );
};

const mapState = ({ posts, users, auth }, { match }) => {
  const postId = match.params.id * 1;
  console.log("match", postId);
  const post = posts.find((post) => post.id === postId) || {};
  console.log("post", post);
  const user = post.user || {};
  console.log("user", user.avatar);
  const photos = post.photos || [];
  console.log("photos", photos);
  const likes = post.likes || [];
  console.log("likes", likes.length);
  const comments = post.comments || [];
  console.log("comments", comments);
  return {
    post,
    user,
    auth,
    photos,
    likes,
    comments,
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
    deletePost: (post, photos) => {
      console.log(post);
      const photosToDelete = photos.filter((photo) => photo.postId === post.id);
      console.log(photosToDelete);
      photosToDelete.forEach((photo) => {
        dispatch(deletePhoto(photo));
      });
      dispatch(deletePost(post));
    },
    deleteComment: (comment) => {
      console.log(comment);
      dispatch(deleteComment(comment));
    },
  };
};

export default connect(mapState, mapDispatch)(SinglePost);
