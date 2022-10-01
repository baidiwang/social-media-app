import React, { useEffect, useState } from "react";
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
  Menu,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red, grey, pink } from "@mui/material/colors";
import {
  addLike,
  deleteLike,
  deletePost,
  deletePhoto,
  deleteComment,
} from "../store";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";
import CommentFAB from "./CommentFAB";
import { io } from "socket.io-client";

let socket;

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
  const [anchorEls, setAnchorEls] = useState({});
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    socket = io();

    return () => socket.emit("forceDisconnect");
  }, []);

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
  const shareOpen = Boolean(anchorEls[post.id]);
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
          marginBottom={10}
          marginRight={10}
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
                <Link
                  style={{ color: "#3FA796" }}
                  to={`/profile/${post.userId}`}
                >
                  <Typography variant="h6">{user.username}</Typography>
                </Link>
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
                <IconButton
                  aria-label="share"
                  onClick={(event) => {
                    anchorEls[post.id] = event.currentTarget;
                    setAnchorEls({ ...anchorEls });
                  }}
                >
                  <ShareIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEls[post.id]}
                  open={shareOpen}
                  onClose={() => {
                    anchorEls[post.id] = null;
                    setAnchorEls({ ...anchorEls });
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>
                    <FacebookShareButton
                      url={`${location.origin}/posts/${post.id}`}
                      quote={post.body}
                    >
                      <Box display="flex" alignItems="center">
                        <FacebookIcon size={32} round />
                        <Box ml={1}>Facebook</Box>
                      </Box>
                    </FacebookShareButton>
                  </MenuItem>
                  <MenuItem>
                    <TwitterShareButton
                      title={post.body}
                      url={`${location.origin}/posts/${post.id}`}
                    >
                      <Box display="flex" alignItems="center">
                        <TwitterIcon size={32} round />
                        <Box ml={1}>Twitter</Box>
                      </Box>
                    </TwitterShareButton>
                  </MenuItem>
                </Menu>
              </CardActions>
              <Box marginLeft={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Link to={`/profile/${user.id}`}>
                    <Avatar
                      sx={{ border: "1px solid #F5C7A9" }}
                      src={user.avatar}
                    />
                  </Link>
                  <Link style={{ color: "#3FA796" }} to={`/profile/${user.id}`}>
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
                            sx={{
                              height: "30px",
                              width: "30px",
                              border: "1px solid #F5C7A9",
                            }}
                            src={comment.user.avatar}
                          />
                        </Link>
                        <Typography sx={{ fontSize: "12px", marginLeft: 1 }}>
                          <Link
                            style={{ color: "#3FA796" }}
                            to={`/profile/${comment.userId}`}
                          >
                            {comment.user.username}
                          </Link>
                        </Typography>
                        <div className="delete-comment-button">
                          {auth.id === comment.userId ? (
                            <Button
                              variant="outlined"
                              style={{ color: "#3FA796" }}
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                deleteComment(comment);
                              }}
                            >
                              Delete
                            </Button>
                          ) : null}
                        </div>
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
              <Box display="flex" alignItems="center" justifyContent="center">
                <CommentFAB authId={auth.id} postId={post.id} socket={socket} />
              </Box>
            </CardContent>
          </Card>
        </Stack>
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
    addLike: async (authId, postId) => {
      await dispatch(addLike(authId, postId));
      await socket.emit("createPost");
    },
    deleteLike: async (likeId, postId) => {
      dispatch(deleteLike(likeId, postId));
      await socket.emit("createPost");
    },
    deletePost: async (post, photos) => {
      console.log(post);
      const photosToDelete = photos.filter((photo) => photo.postId === post.id);
      console.log(photosToDelete);
      for (const photo of photosToDelete) {
        await dispatch(deletePhoto(photo));
      }
      await dispatch(deletePost(post));
      await socket.emit("createPost");
    },
    deleteComment: async (comment) => {
      console.log(comment);
      await dispatch(deleteComment(comment));
      await socket.emit("createPost");
    },
  };
};

export default connect(mapState, mapDispatch)(SinglePost);