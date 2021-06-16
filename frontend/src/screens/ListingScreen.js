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
import { MdContactPhone } from 'react-icons/md';
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
            <Col sm={4} md={6} className="d-flex flex-row align-items-center">
              <Carousel>
                {listing.images?.map((image, i) => (
                  <Carousel.Item key={listing.images[i]}>
                    <Image
                      fluid
                      className="big-img"
                      key={i}
                      src={image}
                      alt="listing-images"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
            <Col sm={4} md={6} className="d-flex flex-row align-items-center">
              <ListGroup variant="secondary">
                <ListGroup.Item variant="secondary">
                  <h3 className="text-left font-weight-bold text-uppercase text-primary">
                    {listing.title}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item
                  variant="light"
                  className="text-left text-primary text-uppercase"
                >
                  <strong className="text-muted">Make:</strong> {listing.make}
                </ListGroup.Item>
                <ListGroup.Item
                  variant="light"
                  className="text-left text-primary text-uppercase"
                >
                  <strong className="text-muted">Model:</strong> {listing.model}
                </ListGroup.Item>
                <ListGroup.Item
                  variant="light"
                  className="text-left text-primary text-uppercase"
                >
                  <strong className="text-muted">Year: </strong>
                  {listing.year?.join(', ')}
                </ListGroup.Item>
                <ListGroup.Item
                  variant="light"
                  className="text-left text-primary text-uppercase"
                >
                  <strong className="text-muted">Category: </strong>
                  {listing.category?.join(', ')}
                </ListGroup.Item>
                <ListGroup.Item
                  variant="light"
                  className="text-left text-primary text-uppercase"
                >
                  <strong className="text-muted">Description:</strong>{' '}
                  {listing.description}
                </ListGroup.Item>
                <ListGroup.Item
                  variant="light"
                  className="text-left text-primary text-uppercase"
                >
                  <strong className="text-muted">Vendor:</strong>{' '}
                  {listing.vendorName?.vendorName}
                </ListGroup.Item>
                <ListGroup.Item
                  variant="light"
                  className="text-left text-primary text-uppercase"
                >
                  <strong className="text-muted">Address:</strong>{' '}
                  {listing.vendorName?.address}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row xs={1} className="d-flex flex-row align-items-center mt-3">
            <Button
              onClick={() => setPrimaryContact(listing.primaryContactNo)}
              variant="primary"
              id="primary-contact"
              className="text-center font-weight-bold text-uppercase"
              block
            >
              <MdContactPhone size={25} /> {primaryContact}
            </Button>
            <Button
              onClick={() => setAlternateContact(listing.alternateContactNo)}
              variant="light"
              id="alternate-contact"
              className="text-uppercase font-weight-bold text-primary"
              block
            >
              <MdContactPhone size={25} className="text-primary" />{' '}
              {alternateContact}
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ListingScreen;
