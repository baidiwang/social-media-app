import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Signup } from "./AuthForm";

const RegisterModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Button
        sx={{ backgroundColor: "#3FA796", color: "#F5C7A9" }}
        onClick={handleOpen}
      >
        Register
      </Button>
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
          <Typography marginTop={2} color={"#3FA796"} variant="h5">
            Register
          </Typography>
          <Box sx={{ marginTop: 5 }}>
            <Signup />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RegisterModal;
