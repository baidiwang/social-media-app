//all images uploaded by user should show up here descending order from the latest one to the lowest one?

import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red, grey, pink } from "@mui/material/colors";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentHelper from "./CommentHelper";
import { addLike } from "../store";
import Typography from "@mui/material/Typography";
const UserPostsPage = ({ user, posts, auth, photos}) => {
    console.log(posts);
    return (
        <div>
            <h1>My Posts: </h1>
    <Box flex={5} p={1}>

      {posts.map((post) => {
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
              {post.likes.find((like) => like.userId === auth.id) ? (
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon sx={{ color: pink[500] }} />
                  {post.likes.length} likes
                </IconButton>
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
        </div>
    )
};
const mapState = (state, { match }) => {
    const user = state.users.find(user => user.id === match.params.id) || {};
    const posts = state.posts.filter(post => post.userId === user.id) || [];
    return {
        user,
        posts,
        photos: state.photos,
        auth: state.auth
    }
};
const mapDispatch = dispatch => {
    return {

    }
};
export default connect(mapState, mapDispatch)(UserPostsPage);