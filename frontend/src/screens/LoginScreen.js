import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/vendorActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const vendorLogin = useSelector((state) => state.vendorLogin);
  const { loading, error, vendorInfo } = vendorLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (vendorInfo) {
      history.push(redirect);
    }
  }, [history, vendorInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Meta title="Q-Scraps | Login" />
      <Link className="btn btn-light btn-sm my-5 text-uppercase" to="/">
        Go Back
      </Link>
      <h1 className="text-light">Login</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="secondary"
          className="text-uppercase text-light font-weight-bold"
          block
        >
          Sign In
        </Button>
      </Form>

      <Row className="mt-5 text-center py-3 bg-light rounded">
        <Col>
          <strong>New vendor?</strong>{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <strong>Click here to register</strong>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
