import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Image, Row, Col } from 'react-bootstrap';

const Listing = ({ listing }) => {
  return (
    <Card className="my-2 my-sm-3 listing">
      <Card.Header className="text-center font-weight-bold text-uppercase text-primary">
        {listing.title}
      </Card.Header>
      <Card.Body>
        <LinkContainer to={`/listing/${listing._id}`}>
          <Row>
            <Col xs={4}>
              <Image
                thumbnail
                src={listing.coverImage}
                alt="listing cover image"
              />
            </Col>
            <Col xs={4} className="text-center">
              <p> {listing.make}</p>
              <p>{listing.model}</p>
              <p>
                {listing.year.map((yr, index) => (
                  <span key={index}>{yr} </span>
                ))}
              </p>
            </Col>
            <Col xs={4} className="text-center">
              <p>
                {listing.category.map((cat, index) => (
                  <p key={index}>{cat}</p>
                ))}
              </p>
            </Col>
          </Row>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default Listing;
