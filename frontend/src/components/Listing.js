import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Image, Row, Col } from 'react-bootstrap';

const Listing = ({ listing }) => {
  return (
    <Card className="my-2 my-sm-3 listing">
      <Card.Header className="text-center font-weight-bold lead small text-uppercase text-primary">
        {listing.title}
      </Card.Header>
      <Card.Body>
        <LinkContainer to={`/listing/${listing._id}`}>
          <Row>
            <Col xs={3} className="d-flex flex-col align-items-center">
              <Image
                thumbnail
                src={listing.coverImage}
                alt="listing cover image"
              />
            </Col>
            <Col
              xs={9}
              className="text-center text-uppercase d-flex flex-col align-items-center"
            >
              <Col xs={6} className="text-muted">
                <p className="small text-center font-weight-bold">
                  {listing.make}
                </p>
                <p className="small text-center font-weight-bold">
                  {listing.model}
                </p>
                <p className="small text-center font-weight-bold">
                  {listing.year.join(', ')}
                </p>
              </Col>

              <Col xs={6}>
                <p className="small text-center text-secondary font-weight-bold">
                  {listing.category.join(', ')}
                </p>
              </Col>
            </Col>
          </Row>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default Listing;
