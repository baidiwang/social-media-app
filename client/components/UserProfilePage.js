//profile page of logged in user : must be able to edit user info && change avatar for profile photo
//show nav for users post / photos / followers?
//must be able to add / edit / delete post

import React from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addConnection, deleteConnection, updateConnection } from "../store";
import { Box } from "@mui/material";
import RequestModal from "./RequestModal";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 20px 0px;
  color: #3fa796;
`;
export const Title = styled.span`
  font-size: 2rem;
  margin-bottom: 20px;
  border-bottom: 2px solid #f5c7a9;
`;

export const Image = styled.img`
  border-radius: 50%;
  margin-bottom: 20px;
  border: 1px solid #f5c7a9;
  cursor: pointer;
  height: 80px;
  width: 80px;
  transition: all 1s ease;
  &:hover {
    transform: scale(1.5);
  }
`;

export const AboutDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const About = styled.span`
  text-align: center;
  font-weight: 900;
  font-size: 12px;
`;

export const Bio = styled.span`
  text-align: center;
  font-size: 10px;
  font-weight: 500;
`;

export const Requests = styled.span``;

export const PeopleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #3fa796;
  margin-top: 30px;
`;

export const Length = styled.span`
  font-weight: 900;
`;

export const FollowersDiv = styled.div`
  margin-left: 50px;
`;

export const FollowingDiv = styled.div`
  margin-right: 50px;
`;

const UserProfilePage = ({
  user,
  connection,
  auth,
  followRequests,
  listOfFollowings,
  listOfFollowers,
  follow,
  unfollow,
  acceptRequest,
}) => {
  const history = useHistory();

  const sendMessage = () => {
    history.push("/messages/" + user.id);
  };

  return (
    <Container>
      <Profile>
        <Title>{user.username}</Title>
        <Link to={`/profile/${auth.id}/update`}>
          <Image src={user.avatar} />
        </Link>
        <AboutDiv>
          <About>About me:</About>
          <Bio>{user.bio}</Bio>
        </AboutDiv>
        <Requests>
          <RequestModal
            followRequests={followRequests}
            connection={connection}
            follow={follow}
            acceptRequest={acceptRequest}
            unfollow={unfollow}
            auth={auth}
            user={user}
          />
        </Requests>
      </Profile>
      {/* modal when the <p> above has been clicked will show the list of follow requests need to be accepted down below -- line 18 - line 47 */}
      <PeopleDiv>
        <FollowersDiv>
          <FollowersModal
            listOfFollowers={listOfFollowers}
            auth={auth}
            user={user}
            unfollow={unfollow}
          />
        </FollowersDiv>
        <FollowingDiv>
          <FollowingModal
            listOfFollowings={listOfFollowings}
            auth={auth}
            user={user}
            unfollow={unfollow}
          />
        </FollowingDiv>
      </PeopleDiv>
    </Container>
  );
};

const mapState = (state, { match }) => {
  const user = state.users.find((user) => user.id === match.params.id) || {};
  //connection -- check if there is a request of the auth to the profile owner
  const connection =
    state.connections.find(
      (connection) =>
        connection.followerId === user.id &&
        connection.followingId === state.auth.id
    ) || {};
  //get all follow requests to the profile owner
  const followRequests =
    state.connections.filter(
      (connection) =>
        connection.followerId === user.id && connection.isAccepted === false
    ) || [];
  //get all list of followers that are accepted
  const listOfFollowers =
    state.connections.filter(
      (connection) =>
        connection.followerId === user.id && connection.isAccepted === true
    ) || [];
  //get all list of people we are following that are accepted
  const listOfFollowings =
    state.connections.filter(
      (connection) =>
        connection.followingId === user.id && connection.isAccepted === true
    ) || [];
  return {
    user,
    connection,
    auth: state.auth,
    followRequests,
    listOfFollowers,
    listOfFollowings,
  };
};

const mapDispatch = (dispatch) => {
  return {
    follow: (auth, user) => {
      dispatch(addConnection(auth, user));
    },
    unfollow: (connection) => {
      dispatch(deleteConnection(connection));
    },
    acceptRequest: (connection, auth, user) => {
      dispatch(updateConnection(connection, auth, user));
    },
  };
};

export default connect(mapState, mapDispatch)(UserProfilePage);