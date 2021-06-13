import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Carousel,
  ListGroup,
  Button,
  Container,
  Image,
} from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

import { listListingDetails } from '../actions/listingActions';

const ListingScreen = ({ match }) => {
  const dispatch = useDispatch();

  const [primaryContact, setPrimaryContact] = useState('Primary Contact');
  const [alternateContact, setAlternateContact] = useState('Alternate Contact');

  const listingDetails = useSelector((state) => state.listingDetails);
  const { loading, error, listing } = listingDetails;

  useEffect(() => {
    if (!listing._id || listing._id !== match.params.id) {
      dispatch(listListingDetails(match.params.id));
    }
  }, [dispatch, match, listing]);

  return (
    <>
      <Link className="btn btn-light btn-sm my-3 text-uppercase" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container fluid className="bg-white rounded p-5">
          <Meta title={listing.title} />
          <Row>
            <Col sm={4} md={6}>
              <Carousel>
                {listing.images?.map((image, i) => (
                  <Carousel.Item>
                    <Image fluid key={i} src={image} alt="listing-images" />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col sm={4} md={6}>
              <ListGroup variant="flush" key="listing-details">
                <ListGroup.Item key="listing-title">
                  <h3 className="text-uppercase text-primary">
                    {listing.title}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item key="listing-make">
                  <strong>Make:</strong> {listing.make}
                </ListGroup.Item>
                <ListGroup.Item key="listing-model">
                  <strong>Model:</strong> {listing.model}
                </ListGroup.Item>
                <ListGroup.Item key="listing-year">
                  <strong>Year:</strong>
                  {listing.year?.map((yr, index) => (
                    <p key={index}>{yr}</p>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item key="listing-category">
                  <strong>Category:</strong>
                  {listing.category?.map((cat, index) => (
                    <p key={index}>{cat}</p>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item key="listing-description">
                  <strong>Description:</strong> {listing.description}
                </ListGroup.Item>
                <ListGroup.Item key="vendor-name">
                  <strong>Vendor:</strong> {listing.vendorName?.vendorName}
                </ListGroup.Item>
                <ListGroup.Item key="vendor-address">
                  <strong>Address:</strong> {listing.vendorName?.address}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Button
              onClick={() => setPrimaryContact(listing.primaryContactNo)}
              variant="light"
              className="text-uppercase font-weight-bold text-primary"
              block
            >
              <FaPhone /> {primaryContact}
            </Button>
            <Button
              onClick={() => setAlternateContact(listing.alternateContactNo)}
              variant="light"
              className="text-uppercase font-weight-bold text-primary"
              block
            >
              <FaPhone /> {alternateContact}
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ListingScreen;
