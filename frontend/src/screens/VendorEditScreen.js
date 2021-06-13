import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import FormContainer from '../components/FormContainer';
import { getVendorDetails, updateVendor } from '../actions/vendorActions';
import { VENDOR_UPDATE_RESET } from '../constants/vendorConstants';

const VendorEditScreen = ({ match, history }) => {
  const vendorId = match.params.id;

  const [vendorName, setVendorName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [primaryContactNo, setPrimaryContactNo] = useState('');
  const [alternateContactNo, setAlternateContactNo] = useState('');
  const [companyRegistration, setCompanyRegistration] = useState('');
  const [address, setAddress] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const vendorDetails = useSelector((state) => state.vendorDetails);
  const { loading, error, vendor } = vendorDetails;

  const vendorUpdate = useSelector((state) => state.vendorUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = vendorUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VENDOR_UPDATE_RESET });
      history.push('/admin/vendorlist');
    } else {
      if (!vendor.vendorName || vendor._id !== vendorId) {
        dispatch(getVendorDetails(vendorId));
      } else {
        setVendorName(vendor.vendorName);
        setEmail(vendor.email);
        setPrimaryContactNo(vendor.primaryContactNo);
        setAlternateContactNo(vendor.alternateContactNo);
        setCompanyRegistration(vendor.companyRegistration);
        setAddress(vendor.address);
        setIsAdmin(vendor.isAdmin);
      }
    }
  }, [dispatch, history, vendorId, vendor, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateVendor({
        _id: vendorId,
        vendorName,
        email,
        password,
        primaryContactNo,
        alternateContactNo,
        companyRegistration,
        address,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Meta title="Q-Scraps | Vendor Edit Screen" />
      <Link
        to="/admin/vendorlist"
        className="btn btn-sm text-uppercase btn-light my-3"
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-light">Edit Vendor Details</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
                placeholder="Enter vendor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter to change vendor's password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new vendor password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="primaryContactNo">
              <Form.Label>Primary Contact Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter vendor's primary contact number"
                value={primaryContactNo}
                onChange={(e) => setPrimaryContactNo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="alternateContactNo">
              <Form.Label>Alternate Contact Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter vendor's alternate contact number"
                value={alternateContactNo}
                onChange={(e) => setAlternateContactNo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="companyRegistration">
              <Form.Label>Company Registration Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vendor's registration number"
                value={companyRegistration}
                onChange={(e) => setCompanyRegistration(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vendor's business address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Set As Administrator"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button
              type="submit"
              variant="secondary"
              className="text-uppercase text-light font-weight-bold"
              block
            >
              Update Vendor
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default VendorEditScreen;
