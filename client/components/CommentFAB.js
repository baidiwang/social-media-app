import React, { useState } from "react";
import {
  Tooltip,
  Fab,
  Box,
  Modal,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import CommentHelper from "./CommentHelper";
import { useHistory } from "react-router-dom";

const CommentFAB = ({ authId, postId, socket }) => {
  const [open, setOpen] = useState(false);
  const theme = createTheme({
    palette: {
      primary: { main: "#3FA796" },
      secondary: { main: "#F5C7A9" },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Tooltip
          onClick={(event) => setOpen(true)}
          title="Add Comment"
          sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
        >
          <Fab color="primary" aria-label="edit">
            <CommentIcon color="secondary" />
          </Fab>
        </Tooltip>
        <Modal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={(event) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={600}
            height={500}
            borderRadius="8px"
            backgroundColor={"background.default"}
            color={"text.primary"}
            textAlign="center"
          >
            <Typography marginTop={2} color={"gray"} variant="h5">
              Post a comment
            </Typography>
            <Box sx={{ marginTop: 5 }}>
              <CommentHelper authId={authId} postId={postId} socket={socket} />
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default CommentFAB;
