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

const Explore = ({ posts, auth }) => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <Box>
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
              title={<Link to={`/posts/${post.id}`}>{post.user.username}</Link>}
              subheader={post.date}
            />
            {post.photos.map((photo) => {
              return (
                <CardMedia
                  key={photo.id}
                  component="img"
                  height="5%"
                  width="5%"
                  image={photo.photoUrl}
                />
              );
            })}
            <CardContent>
              <CardActions disableSpacing>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* <IconButton onClick={() => unLike(auth, post)}> */}
                  <FavoriteIcon sx={{ color: pink[500] }} />
                  {/* </IconButton> */}
                  <Typography>{post.likes.length} likes</Typography>
                </Box>
              </CardActions>
              <Box marginLeft={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Link to={`/profile/${post.userId}`}>
                    <Avatar src={post.user.avatar} />
                  </Link>
                  <Link to={`/profile/${post.userId}`}>
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
                <Box display="flex" alignItems="center" justifyContent="center">
                  <CommentHelper authId={auth.id} postId={post.id} />
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
