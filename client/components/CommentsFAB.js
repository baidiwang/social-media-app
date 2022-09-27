import * as React from "react";
import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CommentHelper from "./CommentHelper";

function CommentsFAB({ authId, postId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ padding: "10px" }}>
      <Button onClick={handleOpen}>Post a Comment</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          width={600}
          height={500}
          marginRight="auto"
          marginLeft="auto"
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
}

export default CommentsFAB;
