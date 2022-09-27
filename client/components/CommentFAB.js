import React, { useState } from "react";
import { Tooltip, Fab, Box, Modal, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import PostCreateForm from "./PostCreateForm";
import CommentHelper from "./CommentHelper";

const CommentFAB = ({ authId, postId }) => {
  const [open, setOpen] = useState(false);
  return (
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
          <CommentIcon />
        </Fab>
      </Tooltip>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={(event) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={450}
          height={800}
          borderRadius="8px"
          backgroundColor={"background.default"}
          color={"text.primary"}
          textAlign="center"
        >
          <Typography marginTop={2} color={"gray"} variant="h5">
            Post a comment
          </Typography>
          <Box sx={{ marginTop: 5 }}>
            <CommentHelper authId={authId} postId={postId} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CommentFAB;
