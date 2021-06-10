import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listListingDetails } from '../actions/listingActions';

const ListingScreen = ({ match }) => {
  const dispatch = useDispatch();

  const listingDetails = useSelector((state) => state.listingDetails);
  const { loading, error, listing } = listingDetails;

  useEffect(() => {
    dispatch(listListingDetails(match.params.id));
  }, [dispatch, match]);

  const [primaryContact, setPrimaryContact] = useState('Primary Contact');
  const [alternateContact, setAlternateContact] = useState('Alternate Contact');

  return (
    <>
      <Link className="btn btn-light my-3 text-uppercase" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Row></Row>
          <Col md={6}>
            <Image fluid src={listing.images} alt="imagesd" />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{listing.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Make: {listing.make}</ListGroup.Item>
              <ListGroup.Item>Model: {listing.model}</ListGroup.Item>
              <ListGroup.Item>Year: {listing.year}</ListGroup.Item>
              <ListGroup.Item>
                Parts Available: {listing.category}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button
                    onClick={() => setPrimaryContact(listing.primaryContactNo)}
                    className="mx-3 bg-primary"
                  >
                    {primaryContact}
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={() =>
                      setAlternateContact(listing.alternateContactNo)
                    }
                    className="mx-3 bg-secondary"
                  >
                    {alternateContact}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ListingScreen;
