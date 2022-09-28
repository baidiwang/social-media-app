import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const RequestModal = ({
  followRequests,
  connection,
  acceptRequest,
  follow,
  unfollow,
  auth,
  user,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  const sendMessage = () => {
    history.push("/messages/" + user.id);
  };
  return (
    <Box>
      <Button
        sx={{
          backgroundColor: "#3FA796",
          color: "#F5C7A9",
          border: "1px solid #F5C7A9",
        }}
        onClick={handleOpen}
      >
        Follow Requests
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          width={400}
          height={500}
          marginRight="auto"
          marginLeft="auto"
          borderRadius="8px"
          backgroundColor="#3FA796"
          color={"text.primary"}
          textAlign="center"
          border="1px solid #3FA796"
        >
          <Typography
            sx={{ borderBottom: "2px solid #f5c7a9" }}
            marginTop={2}
            color={"#F5C7A9"}
            variant="h4"
          >
            Follow Requests
          </Typography>
          <Box sx={{ marginTop: 5 }}>
            {followRequests.length !== 0 ? (
              <Box>
                <Typography marginTop={2} color={"#F5C7A9"} variant="h4">
                  Follow Requests({followRequests.length})
                </Typography>
                {auth.id === user.id ? (
                  <Box>
                    <ul>
                      {followRequests.map((request) => {
                        return (
                          <li key={request.id}>
                            <img
                              src={request.following.avatar}
                              width="20"
                              height="20"
                            />
                            <Link to={`/profile/${request.following.id}`}>
                              {request.following.username}
                            </Link>
                            <button
                              onClick={() => acceptRequest(request, auth, user)}
                            >
                              Accept
                            </button>
                            <button onClick={() => unfollow(connection)}>
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </Box>
                ) : (
                  <div>
                    {connection.id ? (
                      <div>
                        {connection.isAccepted === true ? (
                          <>
                            <button onClick={() => unfollow(connection)}>
                              Unfollow
                            </button>
                            <button
                              style={{ marginLeft: 10 }}
                              onClick={() => sendMessage()}
                            >
                              Send Message
                            </button>
                          </>
                        ) : (
                          <button disabled>Requested</button>
                        )}
                      </div>
                    ) : (
                      <button onClick={() => follow(auth, user)}>Follow</button>
                    )}
                  </div>
                )}
              </Box>
            ) : (
              <Typography marginTop={2} color={"#F5C7A9"} variant="h5">
                No current requests! 😅
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RequestModal;
