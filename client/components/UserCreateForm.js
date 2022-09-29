//to create user when they signup
//need to update form according to needed column in table ie email / if we need firstName / lastName  / bio

import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import styled from "styled-components";

export const Container = styled.div``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 10px;
  width: 30%;
  border-radius: 8px;
  border: 0.25px solid black;

  ::placeholder {
    color: #3fa796;
    margin-left: 5px;
  }
`;

export const Button = styled.button`
  padding: 15px;
  border-radius: 8px;
  border: none;
  width: 40%;
  margin-right: auto;
  margin-left: auto;
`;

export const Title = styled.span`
  font-size: 10px;
  text-align: center;
`;

const UserCreateForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <Container>
      <Form onSubmit={handleSubmit} name={name}>
        <InputDiv>
          <Input placeholder="Enter Username" name="username" type="text" />
        </InputDiv>
        <InputDiv>
          <Input placeholder="Enter Password" name="password" type="password" />
        </InputDiv>
        {error && error.response && <div> {error.response.data} </div>}
        <Button type="submit">{displayName}</Button>
      </Form>
    </Container>
  );
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      //   const email = evt.target. email.value
      // dispatch(authenticate(username, password, email, formName))
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(UserCreateForm);
