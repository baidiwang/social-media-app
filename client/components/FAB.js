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
import EditIcon from "@mui/icons-material/Edit";
import PostCreateForm from "./PostCreateForm";

const FAB = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      primary: { main: "#3FA796" },
      secondary: { main: "#F5C7A9" },
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Tooltip
          onClick={(event) => setOpen(true)}
          title="Add Post"
          sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
        >
          <Fab color="primary" aria-label="edit">
            <EditIcon color="secondary" />
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
            width={450}
            height={750}
            borderRadius="12px"
            backgroundColor={"background.default"}
            color={"text.primary"}
            textAlign="center"
          >
            <Typography marginTop={2} color={"#3FA796"} variant="h5">
              Create New Post
            </Typography>
            <Box sx={{ marginTop: 5 }}>
              <PostCreateForm />
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default FAB;