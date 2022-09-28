import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter, Redirect } from "react-router-dom";
import { addComment } from "../store";
import styled from "styled-components";

export const Form = styled.form``;
export const Caption = styled.textarea`
  width: 90%;
  height: 200px;
  background-color: lightgrey;
  border: none;
  outline: none;
`;
export const Button = styled.button`
  padding: 15px;
  width: 90.5%;
  border: none;
  cursor: pointer;
  background-color: #3fa796;
  color: #f5c7a9;
`;

const CommentHelper = ({ authId, postId, addComment }) => {
  const path = `/posts/${postId}`;
  console.log("path", path);
  console.log("postId", postId);
  const [body, setBody] = useState("");
  const history = useHistory();
  console.log("history", history);

  const onChange = (e) => {
    setBody(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(body, postId, authId);
    setBody("");
    history.push(path);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Caption
        placeholder="Write a comment..."
        value={body}
        onChange={onChange}
        required
      />
      <Button disabled={!body}>Post</Button>
    </Form>
  );
};
const mapDispatch = (dispatch) => {
  return {
    addComment: (comment, postId, authId) => {
      dispatch(addComment(comment, postId, authId));
    },
  };
};
export default connect(null, mapDispatch)(CommentHelper);
