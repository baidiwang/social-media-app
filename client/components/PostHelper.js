//landing page / newsfeed

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Menu, MenuItem } from '@mui/material'
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, grey, pink } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentHelper from "./CommentHelper";
import { addLike, deleteLike, setPhotos, setPosts } from '../store'
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon
} from "react-share";
import { io } from 'socket.io-client'

let socket;
/**
 * COMPONENT
 */
const PostHelper = ({ posts, auth, photos, addLike, deleteLike, getPosts, getPhotos }) => {
  const [anchorEls, setAnchorEls] = useState({});
  const checkLike = (post, auth) => {
    const like = post.likes.find(like => like.userId === auth.id);
    return like;
  };
  const unLike = (auth, post) => {
    const like = checkLike(post, auth);
    deleteLike(like.id, post.id);
  };
  useEffect(() => {
    socket = io()

    socket.on("createPost", (creatorId) => {
      getPosts();
      getPhotos();
    });

    return () => socket.emit('forceDisconnect');
  }, []);
  useEffect(() => {
    const anchorEls = {};
    posts.forEach(post => {
      anchorEls[post.id] = null;
    });
    setAnchorEls(anchorEls);
  }, [posts]);
  return (
    <Box flex={5} p={1}>
        {posts.map((post) => {
          const open = Boolean(anchorEls[post.id]);
        return (
          <Card sx={{ margin: 5 }} key={post.id}>
            <CardHeader
              avatar={
                <Link to={`/profile/${post.user.id}`}>
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {post.user.avatar}
                  </Avatar>
                </Link>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.user.username}
              subheader={post.date}
            />
            {photos
              .filter((photo) => photo.postId === post.id)
              .map((photo) => {
                return (
                  <CardMedia
                    key={photo.id}
                    component="img"
                    height="20%"
                    image={photo.photoUrl}
                  />
                );
              })}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              {checkLike(post, auth) ? (
                <div>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: pink[500] }} />
                    {post.likes.length} likes
                  </IconButton>
                  <button onClick={() => unLike(auth, post)}>
                    Liked
                  </button>
                </div>

              ) : (
                <div>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon sx={{ color: grey[100] }} />
                    {post.likes.length} likes
                  </IconButton>
                  <button onClick={() => addLike(auth.id, post.id)}>
                    Like
                  </button>
                </div>
              )}
              <IconButton aria-label="share" onClick={(event) => {
                anchorEls[post.id] = event.currentTarget;
                setAnchorEls({...anchorEls});
              }}>
                <ShareIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEls[post.id]}
                open={open}
                onClose={() => {
                  anchorEls[post.id] = null;
                  setAnchorEls({...anchorEls});
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem>
                  <FacebookShareButton
                    url={"http://localhost:8080/home"}
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
                    url={"http://localhost:8080/home"}
                  >
                    <Box display="flex" alignItems="center">
                      <TwitterIcon size={32} round />
                      <Box ml={1}>Twitter</Box>
                    </Box>
                  </TwitterShareButton>
                </MenuItem>
              </Menu>
            </CardActions>
            ---------Comments--------------
            <br />
            {post.comments.map((comment) => {
              return (
                <Card key={comment.id}>
                  <CardHeader
                    avatar={
                      <Link to={`/profile/${comment.user.id}`}>
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          {comment.user.avatar}
                        </Avatar>
                      </Link>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={comment.user.username}
                    subheader={comment.date}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {comment.body}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
            <CommentHelper authId={auth.id} postId={post.id} />
            <hr />
          </Card>
        );
      })}
    </Box>
  );
};

const mapDispatch = (dispatch) => {
  return {
    addLike: (authId, postId) => {
      dispatch(addLike(authId, postId));
    },
    deleteLike: (likeId, postId) => {
      dispatch(deleteLike(likeId, postId))
    },
    getPosts: () => dispatch(setPosts()),
    getPhotos: () => dispatch(setPhotos())
  };
};

export default connect(null, mapDispatch)(PostHelper);
