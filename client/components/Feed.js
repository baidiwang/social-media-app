//landing page / newsfeed

import React from "react";
import { connect } from "react-redux";
import PostCreateForm from "./PostCreateForm";
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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
/**
 * COMPONENT
 */
export const Feed = ({ username, posts, users, auth }) => {
  return (
    <Box flex={5} p={1}>
      <h3>Welcome, {username}</h3>
      <PostCreateForm />
      {posts.map((post) => {

        return (
          <Card key={post.id}>
            
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
            {post.photos
              ? post.photos.map((photo) => {
                  console.log("photo", photo);
                  return (
                    <CardMedia
                      key={photo.id}
                      component="img"
                      height="20%"
                      image={photo.photoUrl}
                    />
                  );
                })
              : null}

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}

    </Box>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log("posts", state.posts);
  console.log("auth", state.users);

  return {
    username: state.auth.username,
    posts: state.posts,
    users: state.users,
    auth: state.auth,
  };
};

export default connect(mapState)(Feed);
