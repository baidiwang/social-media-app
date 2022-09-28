import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createTheme,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red, grey, pink } from "@mui/material/colors";
import CommentHelper from "./CommentHelper";
import CommentsFAB from "./CommentsFAB";

const Explore = ({ posts, auth }) => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <Box sx={{ padding: 10 }}>
      {posts.map((post) => {
        return (
          <Card
            key={post.id}
            sx={{
              height: "80%",
              width: "80%",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: 5,
            }}
          >
            <CardHeader
              avatar={
                <Link to={`/profile/${post.userId}`}>
                  <Avatar src={post.user.avatar} />
                </Link>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Link style={{ color: "#3FA796" }} to={`/posts/${post.id}`}>
                  <Typography variant="h6">{post.user.username}</Typography>
                </Link>
              }
              subheader={post.date}
            />
            {post.photos.map((photo) => {
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FavoriteIcon sx={{ color: pink[500] }} />
                  <Typography>{post.likes.length} likes</Typography>
                </Box>
              </CardActions>
              <Box marginLeft={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Link to={`/profile/${post.userId}`}>
                    <Avatar src={post.user.avatar} />
                  </Link>
                  <Link
                    style={{ color: "#3FA796" }}
                    to={`/profile/${post.userId}`}
                  >
                    <Typography variant="h6">{post.user.username}</Typography>
                  </Link>
                </Box>
                <Typography>{post.body}</Typography>
              </Box>
              <Box marginTop={3}>
                {post.comments.map((comment) => {
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
                          <Link
                            style={{ color: "#3FA796" }}
                            to={`/profile/${comment.userId}`}
                          >
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
                <Box display="flex" alignItems="center" justifyContent="center">
                  {auth.id && <CommentsFAB authId={auth.id} postId={post.id} />}
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

const mapState = ({ posts, auth }) => {
  return {
    posts,
    auth,
  };
};

export default connect(mapState)(Explore);
