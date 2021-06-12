import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getVendorDetails,
  updateVendorProfile,
} from '../actions/vendorActions';
import { VENDOR_UPDATE_PROFILE_RESET } from '../constants/vendorConstants';

const ProfileScreen = ({ location, history }) => {
  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [primaryContactNo, setPrimaryContactNo] = useState('');
  const [alternateContactNo, setAlternateContactNo] = useState('');
  const [companyRegistration, setCompanyRegistration] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();

  const vendorDetails = useSelector((state) => state.vendorDetails);
  const { loading, error, vendor } = vendorDetails;

  const vendorLogin = useSelector((state) => state.vendorLogin);
  const { vendorInfo } = vendorLogin;

  const vendorUpdateProfile = useSelector((state) => state.vendorUpdateProfile);
  const { success } = vendorUpdateProfile;

  useEffect(() => {
    if (!vendorInfo) {
      history.push('/login');
    } else {
      if (!vendor || !vendor.vendorName || success) {
        dispatch({ type: VENDOR_UPDATE_PROFILE_RESET });
        dispatch(getVendorDetails('profile'));
      } else {
        setVendorName(vendor.vendorName);
        setEmail(vendor.email);
        setPrimaryContactNo(vendor.primaryContactNo);
        setAlternateContactNo(vendor.alternateContactNo);
        setCompanyRegistration(vendor.companyRegistration);
        setAddress(vendor.address);
      }
    }
  }, [dispatch, history, vendorInfo, vendor, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateVendorProfile({
          id: vendor._id,
          vendorName,
          email,
          password,
          primaryContactNo,
          alternateContactNo,
          companyRegistration,
          address,
        })
      );
    }
  };

  return (
    <Row>
      <Col>
        <h2>Vendor Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="vendorName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter vendor name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="primaryContactNo">
            <Form.Label>Primary Contact Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your primary contact number"
              value={primaryContactNo}
              onChange={(e) => setPrimaryContactNo(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="alternateContactNo">
            <Form.Label>Alternate Contact Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter an alternate contact number"
              value={alternateContactNo}
              onChange={(e) => setAlternateContactNo(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="companyRegistration">
            <Form.Label>Company Registration Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your company's registration number"
              value={companyRegistration}
              onChange={(e) => setCompanyRegistration(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your business address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Profile
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
