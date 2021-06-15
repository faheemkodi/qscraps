import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Image, Row, Col } from 'react-bootstrap';

const Listing = ({ listing }) => {
  return (
    <Card className="my-2 my-sm-3 listing">
      <Card.Header className="font-weight-bold small text-uppercase text-primary">
        {listing.title}
      </Card.Header>
      <Card.Body>
        <LinkContainer to={`/listing/${listing._id}`}>
          <Row>
            <Col xs={4} className="my-auto">
              <Image
                fluid
                thumbnail
                src={listing.coverImage}
                alt="listing cover image"
              />
            </Col>
            <Col xs={8} className="text-uppercase my-auto">
              <p className="font-weight-bold my-auto">{listing.make}</p>
              <p className="my-auto">{listing.model}</p>
              <p className="small font-weight-bold my-auto">
                {listing.year.join(', ')}
              </p>

              <p className="small text-secondary my-auto">
                {listing.category.join(', ')}
              </p>
            </Col>
          </Row>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default Listing;
