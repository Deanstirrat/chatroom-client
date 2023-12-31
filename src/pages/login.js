import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import {Container, Button, Form} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useAuth } from '../components/AuthProvider';
import styled from 'styled-components';

const Login = () => {

  const { login } = useAuth();

  const [newUser, setNewUser] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });
  const [registrationFormData, setRegistrationFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState(null);
  const [loginErrors, setLoginErrors] = useState(null);

  const handleChangeLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleChangeRegistrationForm = (e) => {
    const { name, value } = e.target;
    setRegistrationFormData({ ...registrationFormData, [name]: value});
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API's login endpoint
      const response = await fetch('https://cold-bush-9506.fly.dev/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData),
      });

      if (response.ok) {
        // Handle successful login (e.g., store JWT, redirect)
        console.log('Login successful');
        const data = await response.json();
        login(data.token);
      } else {
        // Handle login failure (e.g., show error message)
        console.error('Login failed');
        const data = await response.json();
        setLoginErrors(data.message);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API's login endpoint
      const response = await fetch('https://cold-bush-9506.fly.dev/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationFormData),
      });

      if (response.ok) {
        // Handle successful login (e.g., store JWT, redirect)
        console.log('Registration successful');
        setNewUser(false);
      } else {
        // Handle login failure (e.g., show error message)
        const data = await response.json();
        setErrors(data.errors);
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return(
    <div>
      <h1>Dean's Chat Rooms</h1>
      {!newUser && 
        <Container>
          <div className="row justify-content-center">
            <div className="col-md-6">
            <Form onSubmit={handleSubmitLogin}>
              <FloatingLabel
                label="Username"
                className="mb-3"
              >
              <Form.Control type="text" name='username' id='username' value={loginFormData.username} onChange={handleChangeLoginForm} required />
              </FloatingLabel>
              <FloatingLabel
                label="password"
                className="mb-3"
              >
              <Form.Control type="password" name='password' id='password' value={loginFormData.password} onChange={handleChangeLoginForm} required />
              </FloatingLabel>
              {loginErrors && <p>Error: {loginErrors}</p>
              }
            <button type="submit" className="btn btn-primary">Login</button>
          </Form>
          <Button variant='link' onClick={()=> setNewUser(true)}>New User</Button>
            </div>
          </div>
        </Container>}

    {newUser && 
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmitRegister}>
              <FloatingLabel
                label="email"
                className="mb-3"
              >
              <Form.Control type="email" name='email' id='email' value={registrationFormData.email} onChange={handleChangeRegistrationForm} required />
              </FloatingLabel>
              <FloatingLabel
                label="username"
                className="mb-3"
              >
              <Form.Control type="text" name='username' id='username' value={registrationFormData.username} onChange={handleChangeRegistrationForm} required />
              </FloatingLabel>
              <FloatingLabel
                label="password"
                className="mb-3"
              >
              <Form.Control type="password" name='password' id='password' value={registrationFormData.password} onChange={handleChangeRegistrationForm} required />
              </FloatingLabel>
              <FloatingLabel
                label="confirm password"
                className="mb-3"
              >
              <Form.Control type="password" name='passwordConfirm' id='passwordConfirm' value={registrationFormData.passwordConfirm} onChange={handleChangeRegistrationForm} required />
              </FloatingLabel>
              {errors && 
                <ErrorContainer>
                  <p>Error:</p>
                  {errors.map((error) => (<p>{error.msg}</p>))}
                </ErrorContainer>
              }
              <ButtonsContainer>
                <BackButton variant='secondary' onClick={()=> setNewUser(false)}>back</BackButton>
                <RegisterButton type="submit" className="btn btn-primary">Register</RegisterButton>
              </ButtonsContainer>
            </form>
          </div>
        </div>
      </div>}
  </div>
  );
}

export default Login;


const ErrorContainer = styled.div`
text-align: left;
`


const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-start; /* Justify content to the left */
align-items: center;
`

const BackButton = styled(Button)`
`

const RegisterButton = styled.button`
margin-left: auto;
`




