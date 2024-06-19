import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { myAxios } from "../services/helper";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
  padding: 1rem;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  background: url("/images.png") no-repeat center top / 60px 60px;
  @media (max-width: 576px) {
    padding: 1rem;
    max-width: 90%;
    background-size: 50px 50px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: #e60023; /* Target red */
  margin-top: 80px; /* To push down the title below the background image */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 0.75rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 0.4rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: 100%;
  margin-top: 0.25rem;
  &:focus {
    border-color: #e60023;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(230, 0, 35, 0.25);
  }
`;

const Button = styled.button`
  padding: 0.4rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #e60023; /* Target red */
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  &:hover {
    background-color: #c0001b;
  }
`;

const LoginLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 0.4rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f8f9fa;
  color: #000;
  text-decoration: none;
  margin-top: 0.5rem;
  &:hover {
    background-color: #e2e6ea;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
`;

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const address = null;
    console.log("aege eaaef");
    event.preventDefault();
    setErrors({});
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !username ||
      !password
    ) {
      setErrors({
        firstname: !firstName && "First Name is required",
        lastname: !lastName && "Last Name is required",
        phonenumber: !phoneNumber && "Phone Number is required",
        email: !email && "Email is required",
        username: !username && "Username is required",
        password: !password && "Password is required",
      });
      return;
    }

    try {
      console.log(firstName);
      console.log(lastName);
      console.log(phoneNumber);
      console.log(email);
      console.log(username);
      console.log(address);

      const response = await myAxios.post("/api/v1/target/auth/signup", {
        firstName,
        lastName,
        phoneNumber,
        email,
        username,
        password,
        address,
      });
      if (response.status === 404) {
        alert("Error: " + response.statusText);
      } else if (response.status === 400) {
        alert("Invalid Credentials");
      } else if (response.status === 200) {
        alert("Successfully Signed Up");
        navigate("/", { state: { username } });
      } else {
        alert("Unexpected response status: " + response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        setErrors({ form: error.response.data.message });
      } else if (error.request) {
        console.error("Request error:", error.request);
        setErrors({ form: "Request error. Please try again later." });
      } else {
        console.error("Error:", error.message);
        setErrors({ form: error.message });
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign-Up</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="First Name">First Name</Label>
            <Input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="Last Name">Last Name</Label>
            <Input
              type="text"
              placeholder="Enter Last Name"
              name="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="Phone Number">Phone Number</Label>
            <Input
              type="text"
              placeholder="Enter Phone Number"
              name="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>
          {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
          <Button type="submit">Sign Up</Button>
          <LoginLink to="/">Login</LoginLink>
        </Form>
      </FormWrapper>
    </Container>
  );
}

export default Signup;
