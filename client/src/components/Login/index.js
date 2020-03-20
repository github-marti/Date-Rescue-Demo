import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';
import "./style.css";
import { LOGIN_USER } from '../../utils/actions';

const Login = function () {

  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState({
    home: false,
    signup: false
  });

  const [state, dispatch] = useStoreContext();

  const handleOnChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({
      ...user,
      [name]: value
    })
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    axios.post('/api/login', user)
      .then(res => {
        console.log(state);
        dispatch({
          type: LOGIN_USER,
          username: res.data.username,
          userid: res.data.id,
          phoneNumber: res.data.phoneNumber
        })
        setRedirect({
          home: true
        });
      })
      .catch(err => {
        console.log(err);
        setError(true);
      })
  };

  const handleClick = event => {
    setRedirect({
      signup: true
    })
  }

  const renderRedirect = () => {
    if (redirect.home) {
      return <Redirect to='/' />
    } else if (redirect.signup) {
      return <Redirect to="/signup" />
    }
  }

  return (
    <div>
      {renderRedirect()}
      <div className="bcg1">
        <span className="logo">
          <img src={require("./redblock2.png")} height="150" width="200" alt="logo"/>
        </span>
        <Container className="login">
          <div>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form className={"form clearfix"} onSubmit={handleFormSubmit}>
                <Col>
                  <h2>Log In</h2>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="username"
                      name="username"
                      id="user"
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>
                {error ? <p className="error">Username or password is incorrect.</p> : <div />}
                <Button className="btn2" color="secondary" onClick={handleClick}>Sign Up</Button>
                <Button className="btn1" color="success">Log In</Button>
              </Form>
            </Col>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Login;