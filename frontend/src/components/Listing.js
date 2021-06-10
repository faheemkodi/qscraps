import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'react-bootstrap';

const Listing = ({ listing }) => {
  const [primaryContact, setPrimaryContact] = useState('Primary Contact');
  const [alternateContact, setAlternateContact] = useState('Alternate Contact');

  return (
    <Card bg="primary" text="light" className="m-3 p-3 rounded">
      <Link to={`/listing/${listing._id}`}>
        <Image fluid src={listing.coverImage} alt="First slide" />
      </Link>
      <Card.Body>
        <Link to={`/listing/${listing._id}`}>
          <Card.Title as="div" className="text-center text-uppercase">
            <strong>{listing.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="text-center pb-3">
            <div>Vendor: {listing.vendorName}</div>
            <div>Make: {listing.make}</div>
            <div>Model: {listing.model}</div>
            <div>Year: {listing.category.join(', ')}</div>
            <div>Parts Available: {listing.year.join(', ')}</div>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              onClick={() => setPrimaryContact(listing.primaryContactNo)}
              className="mx-3"
              variant="secondary"
            >
              {primaryContact}
            </Button>
            <Button
              onClick={() => setAlternateContact(listing.alternateContactNo)}
              className="mx-3"
              variant="secondary"
            >
              {alternateContact}
            </Button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Listing;
