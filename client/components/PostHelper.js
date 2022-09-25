//landing page / newsfeed

import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
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
import { addLike, deleteLike, deletePost, deletePhoto, deleteComment } from "../store";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

/**
 * COMPONENT
 */
const PostHelper = ({ posts, auth, photos, addLike, deleteLike, deletePost, deleteComment }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  let [targetPost, setTargetPost] = useState({}) ;

  
  const checkLike = (post, auth) => {
    const like = post.likes.find((like) => like.userId === auth.id);
    return like;
  };
  const unLike = (auth, post) => {
    const like = checkLike(post, auth);
    deleteLike(like.id, post.id);
  };

 
  return (
    
    <Box flex={5} p={1}>
        {posts.map((post) => {
        return (
          <Card sx={{ margin: 5 }} key={post.id}>
                        {auth.id === targetPost.userId ? 
                        <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={(event) => setOpen(false)}
                      >
                        <MenuItem onClick={() => {
                          console.log('here');
                          setOpen(false)
                          deletePost(targetPost, photos)}}>
                          Delete
                        </MenuItem>
                      </Menu>
            : null}
            <CardHeader
              avatar={
                <Link to={`/profile/${post.user.id}`}>
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {post.user.avatar}
                  </Avatar>
                </Link>
              }
              action={
                <IconButton aria-label="settings"
                onClick={(event) => {
                  setTargetPost(post);

                  setOpen(true)
                  setAnchorEl(event.currentTarget)
                }}>
                  <MoreVertIcon/>

                </IconButton>
                
              }
              title={<Link to={`/posts/${post.id}`}>{post.user.username}</Link>}
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
                  <button onClick={() => unLike(auth, post)}>Liked</button>
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
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
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
                     <div>
                      {auth.id === comment.userId ? <Button variant='outlined' startIcon={<DeleteIcon/>}
                      onClick={() => {

                        deleteComment(comment)

                      }} >
                        Delete
                        </Button> : null}
                      </div>

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
    deletePost: (post, photos) => {
      console.log(post);
      const photosToDelete = photos.filter((photo) => photo.postId === post.id)
      console.log(photosToDelete);
      photosToDelete.forEach((photo) => {
        dispatch(deletePhoto(photo))
      })
      dispatch(deletePost(post))
    },
     deleteComment: (comment) => {
      console.log(comment);
      dispatch(deleteComment(comment))
     }
  };
};

export default connect(null, mapDispatch)(PostHelper);
