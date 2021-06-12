import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image, ListGroup } from 'react-bootstrap';
import { FaPhone } from 'react-icons/fa';

const Listing = ({ listing }) => {
  const [primaryContact, setPrimaryContact] = useState('Primary Contact');
  const [alternateContact, setAlternateContact] = useState('Alternate Contact');

  return (
    <Card as="div" className="m-3 p-3 rounded mx-auto listing">
      <Link to={`/listing/${listing._id}`}>
        <Image
          height="200"
          width="200"
          thumbnail
          src={listing.coverImage}
          alt="First slide"
        />
      </Link>

      <Card.Body className="listing-body">
        <Link to={`/listing/${listing._id}`}>
          <Card.Title as="div" className="text-center text-uppercase">
            <strong>{listing.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <ListGroup className="text-center listing-list" horizontal="md">
            <ListGroup.Item key="1">
              <strong>Make:</strong>
              <br />
              {listing.make}
            </ListGroup.Item>
            <ListGroup.Item key="2">
              <strong>Model:</strong>
              <br />
              {listing.model}
            </ListGroup.Item>
            <ListGroup.Item key="3">
              <strong>Year:</strong>
              <br />
              {listing.year.map((yr, index) => (
                <p key={index}>{yr}</p>
              ))}
            </ListGroup.Item>
            <ListGroup.Item key="4">
              <strong>Category:</strong>
              <br />
              {listing.category.map((cat, index) => (
                <p key={index}>{cat}</p>
              ))}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-md-flex flex-row justify-content-around mt-3">
            <Button
              onClick={() => setPrimaryContact(listing.primaryContactNo)}
              className="cta"
              variant="primary"
            >
              <FaPhone /> {primaryContact}
            </Button>
            <Button
              onClick={() => setAlternateContact(listing.alternateContactNo)}
              className="cta"
              variant="primary"
            >
              <FaPhone /> {alternateContact}
            </Button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Listing;
