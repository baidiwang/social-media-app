import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { addComment } from "../store";

const CommentHelper = ({ authId, postId, addComment }) => {
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
    history.go(0);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Write a comment..."
        type="text"
        value={body}
        onChange={onChange}
        required
      />
      <button>Send</button>
    </form>
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
